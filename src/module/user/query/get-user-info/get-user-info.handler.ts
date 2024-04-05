import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { GetUserInfoQuery } from './get-user-info.query';
import { UserAboutMeResponseDto } from '../../dto/about-me.dto';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetUserInfoQuery)
export class GetUserInfoHandler implements IQueryHandler<GetUserInfoQuery> {
    constructor(private readonly userRepository: UserRepository) {}
    async execute({ id }: GetUserInfoQuery): Promise<UserAboutMeResponseDto> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new BadRequestException('Такой пользователь не найден');
        }
        return user;
    }
}
