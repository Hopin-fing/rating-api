import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetUserByEmailQuery } from '../user/query/get-user-by-email';
import { CreateUserCommand } from '../user/command/create-user';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { IJWTPayload, TokenResponseDto } from './types/auth.interface';
import { User } from '@prisma/client';
import { UserEntity } from '../user/entities/user.entity';
import { RefreshTokenDto, RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';
import { PasswordRecoveryDto, PasswordRecoveryResponseDto } from './dto/password-recovery.dto';
import { SetNewPasswordDto, SetNewPasswordResponseDto } from './dto/set-new-password.dto';
import { GetUserByRecoveryTokenQuery } from '../user/query/get-user-by-recovery-token';
import { RecoveryPasswordResponseEnum } from './constants/recovery-password.response.enum';
import { SetNewPasswordResponseEnum } from './constants/set-new-password.response.enum';
import { AddRecoveryTokenCommand } from '../user/command/add-recovery-token';
import { RemoveRecoveryTokenCommand } from '../user/command/remove-recovery-token';
import { SetNewPasswordCommand } from '../user/command/set-new-password';
import { GenerateRecoveryTokenCommand } from '../user/command/generate-recovery-token';
import { ChangePasswordResponseEnum } from '@libs/contracts/commands/auth/enums';
import { ChangePasswordResponseDto } from './dto/change-password.dto';
import { RoleEnum } from '@common/decorators/roles.decorator';
import { GenerateEmailHTMLCommand } from '@common/integrations/email/command/email-generate-html/email-generate-html.command';
import { RestoreTemplateData, Template } from '@common/integrations/email/interfaces/generate-email-html';
import { EmailSendCommand } from '@common/integrations/email/command/email-send/email-send.command';
import { EmailSendResponse } from '@common/integrations/email/interfaces/email-send.response';

@Injectable()
export class AuthService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    private accessTokenSecret = this.configService.get<string>('ACCESS_TOKEN_JWT_SECRET') ?? 'secret';
    private accessTokenExpiration = this.configService.get<string>('ACCESS_TOKEN_EXPIRATION') ?? '1h';
    private refreshTokenSecret = this.configService.get<string>('REFRESH_TOKEN_JWT_SECRET') ?? 'secret1';
    private refreshTokenExpiration = this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') ?? '1d';

    async register(dto: RegisterDto): Promise<RegisterResponseDto> {
        const { email, name, password } = dto;

        const existUser = await this.queryBus.execute<GetUserByEmailQuery, UserEntity>(new GetUserByEmailQuery(email));
        if (existUser) {
            throw new BadRequestException('Пользователь с таким email уже существует');
        }
        const role = RoleEnum.USER;
        const createdUser = await this.commandBus.execute<CreateUserCommand, User>(new CreateUserCommand(email, name, role, password));
        return this.getTokens({
            role: createdUser.role,
            id: createdUser.uuid,
        });
    }

    async login(dto: LoginDto): Promise<LoginResponseDto> {
        const jwtPayload = await this.validateUser(dto);
        if (!jwtPayload) {
            throw new BadRequestException('Неверный логин или пароль');
        }
        return this.getTokens(jwtPayload);
    }

    async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
        const jwtPayload: IJWTPayload | null = await this.validateRefreshToken(dto);
        if (!jwtPayload) {
            throw new BadRequestException('Токен не валиден');
        }
        return this.getTokens({
            role: jwtPayload.role,
            id: jwtPayload.id,
        });
    }

    async passwordRecovery(dto: PasswordRecoveryDto): Promise<PasswordRecoveryResponseDto> {
        const existUser = await this.queryBus.execute<GetUserByEmailQuery, UserEntity>(new GetUserByEmailQuery(dto.email));
        if (!existUser) {
            throw new BadRequestException({
                status: RecoveryPasswordResponseEnum.UserNotFound,
            });
        }
        const recoveryToken = await this.commandBus.execute<GenerateRecoveryTokenCommand, string>(
            new GenerateRecoveryTokenCommand(existUser.uuid),
        );
        const updatedUser = await this.commandBus.execute<AddRecoveryTokenCommand, boolean>(
            new AddRecoveryTokenCommand(existUser.uuid, recoveryToken),
        );
        if (!updatedUser) {
            throw new InternalServerErrorException({
                status: RecoveryPasswordResponseEnum.GenerateVerifyTokenError,
            });
        }
        const emailHtml = await this.commandBus.execute<GenerateEmailHTMLCommand<RestoreTemplateData>, string>(
            new GenerateEmailHTMLCommand({ token: recoveryToken }, Template.RecoverPassword),
        );
        if (!emailHtml) {
            throw new InternalServerErrorException({
                status: RecoveryPasswordResponseEnum.GenerateHtmlError,
            });
        }
        const emailResponse = await this.commandBus.execute<EmailSendCommand, EmailSendResponse | null>(
            new EmailSendCommand(existUser.email, 'noreply@purplecode.ru', 'Ratingus', 'Восстановление пароля. Ratingus.ru', emailHtml),
        );
        if (!emailResponse) {
            throw new InternalServerErrorException({
                status: RecoveryPasswordResponseEnum.SendEmailError,
            });
        }

        return {
            status: RecoveryPasswordResponseEnum.Success,
        };
    }

    async changePassword(userId: string, newPassword: string): Promise<ChangePasswordResponseDto> {
        const setNewPassword = await this.commandBus.execute<SetNewPasswordCommand, boolean>(
            new SetNewPasswordCommand(userId, newPassword),
        );

        if (!setNewPassword)
            throw new InternalServerErrorException({
                status: ChangePasswordResponseEnum.Error,
            });

        return {
            status: ChangePasswordResponseEnum.Success,
        };
    }

    async setNewPassword(dto: SetNewPasswordDto): Promise<SetNewPasswordResponseDto> {
        const existUser = await this.queryBus.execute<GetUserByRecoveryTokenQuery, UserEntity>(
            new GetUserByRecoveryTokenQuery(dto.recoveryToken),
        );

        if (!existUser)
            throw new BadRequestException({
                status: SetNewPasswordResponseEnum.VerificationCodeNotFound,
            });

        const removeRecoveryToken = await this.commandBus.execute<RemoveRecoveryTokenCommand, boolean>(
            new RemoveRecoveryTokenCommand(existUser.uuid),
        );

        if (!removeRecoveryToken)
            throw new InternalServerErrorException({
                status: SetNewPasswordResponseEnum.Error,
            });

        const setNewPassword = await this.commandBus.execute<SetNewPasswordCommand, boolean>(
            new SetNewPasswordCommand(existUser.uuid, dto.newPassword),
        );

        if (!setNewPassword)
            throw new InternalServerErrorException({
                status: SetNewPasswordResponseEnum.Error,
            });

        return {
            status: SetNewPasswordResponseEnum.Success,
        };
    }

    private async validateRefreshToken({ refreshToken }: RefreshTokenDto): Promise<IJWTPayload | null> {
        try {
            const { payload } = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.refreshTokenSecret,
            });
            return payload;
        } catch (error) {
            return null;
        }
    }

    private async validateUser({ email, password }: LoginDto): Promise<IJWTPayload | null> {
        const user = await this.queryBus.execute<GetUserByEmailQuery, UserEntity>(new GetUserByEmailQuery(email));

        if (!user) {
            return null;
        }

        const isCorrectPassword = await user.validatePassword(password);

        if (!isCorrectPassword) {
            return null;
        }

        return { role: user.role, id: user.uuid };
    }

    private async getTokens(payload: IJWTPayload): Promise<TokenResponseDto> {
        const [accessToken, refreshToken] = await Promise.all([
            this.createToken(payload, this.accessTokenSecret, this.accessTokenExpiration),
            this.createToken(payload, this.refreshTokenSecret, this.refreshTokenExpiration),
        ]);

        return { accessToken, refreshToken };
    }

    private async createToken(payload: IJWTPayload, secret: string, expiresIn: string): Promise<string> {
        return this.jwtService.signAsync(
            {
                payload,
            },
            {
                secret,
                expiresIn,
            },
        );
    }
}
