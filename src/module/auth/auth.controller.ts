import { Body, Controller, HttpCode, InternalServerErrorException, Post, UseGuards, Headers } from '@nestjs/common';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token.dto';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
import { HasRoles, RoleEnum } from '@common/decorators/roles.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '@common/decorators/user.decorator';
import { UserContext } from './types/user.context.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
        const result = await this.authService.register(dto);
        if (!result) {
            throw new InternalServerErrorException('Произошла ошибка при попытке регистрации');
        }
        return result;
    }

    @Post('login')
    async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(dto);
    }

    @HttpCode(201)
    @Post('refresh-token')
    @UseGuards(RefreshTokenGuard)
    async refreshToken(@Headers('authorization') token: string): Promise<RefreshTokenResponseDto> {
        return this.authService.refreshToken({ refreshToken: token.split(' ')[1] });
    }

    @Post('password-recovery')
    async passwordRecovery(@Body() dto: PasswordRecoveryDto) {
        return await this.authService.passwordRecovery(dto);
    }

    @Post('set-new-password')
    async setNewPassword(@Body() dto: SetNewPasswordDto) {
        return await this.authService.setNewPassword(dto);
    }

    @HasRoles([RoleEnum.USER, RoleEnum.ADMIN])
    @Post('change-password')
    async changePassword(@User() user: UserContext, @Body() dto: ChangePasswordDto) {
        return await this.authService.changePassword(user.userId, dto.newPassword);
    }
}
