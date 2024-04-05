import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../module/auth/guard/accessToken.guard';
import { RolesGuard } from '../../module/auth/guard/roles.guard';

export enum RoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export const HasRoles = ([...roles]: RoleEnum[]) => {
    return applyDecorators(SetMetadata('roles', roles), UseGuards(AccessTokenGuard, RolesGuard));
};
