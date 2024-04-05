import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@common/config/jwt/jwt.config';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
    imports: [CqrsModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.registerAsync(getJWTConfig())],
    controllers: [AuthController],
    providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
    exports: [PassportModule, AuthService],
})
export class AuthModule {}
