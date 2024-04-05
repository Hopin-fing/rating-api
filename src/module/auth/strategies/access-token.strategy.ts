import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IJWTPayload } from '../types/auth.interface';
import { UserContext } from '../types/user.context.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'accessToken') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('ACCESS_TOKEN_JWT_SECRET'),
            signOptions: {
                expiresIn: configService.getOrThrow('ACCESS_TOKEN_EXPIRATION'),
            },
        });
    }

    validate(data: { payload: IJWTPayload }): UserContext {
        return {
            userId: data.payload.id,
            userRole: data.payload.role,
        };
    }
}
