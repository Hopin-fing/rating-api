import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { UserRepository } from '../../user.repository';
import { User } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(private readonly userRepository: UserRepository) {}
    async execute({ id }: GetUserByIdQuery): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new BadRequestException('Такой пользователь не найден');
        }
        return user;
    }
}
