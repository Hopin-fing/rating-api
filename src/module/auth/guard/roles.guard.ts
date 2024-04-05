import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        try {
            const accessRoles = this.reflector.get('roles', context.getHandler());
            if (!accessRoles) {
                return false;
            }
            const request = context.switchToHttp().getRequest();
            const token = request.get('Authorization').replace('Bearer', '').trim();
            const tokenData = this.jwtService.decode(token);
            const userRole = tokenData?.payload?.role;
            return accessRoles.includes(userRole);
        } catch {
            return false;
        }
    }
}
