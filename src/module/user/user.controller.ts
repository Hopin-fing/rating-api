import { HasRoles, RoleEnum } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import { Controller, Get, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserContext } from '../auth/types/user.context.interface';
import { UserAboutMeResponseDto } from './dto/about-me.dto';
import { GetUserInfoQuery } from './query/get-user-info';
import { UserUpdateDto, UserUpdateResponseDto } from './dto/update.dto';
import { UpdateUserCommand } from './command/update-user/update-user.command';

@Controller('user')
export class UserController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @HasRoles([RoleEnum.USER])
    @Get('me')
    async getUserInfo(@User() user: UserContext): Promise<UserAboutMeResponseDto> {
        return this.queryBus.execute<GetUserInfoQuery>(new GetUserInfoQuery(user.userId));
    }

    @HasRoles([RoleEnum.USER])
    @Patch('')
    async updateUser(@User() user: UserContext, dto: UserUpdateDto): Promise<UserUpdateResponseDto> {
        return this.commandBus.execute(new UpdateUserCommand(user.userId, dto.avatar, dto.name, dto.description));
    }
}
