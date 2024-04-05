import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserRepository } from '../../user.repository';
import { Logger } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
    private readonly logger = new Logger(GetUserByEmailHandler.name);

    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: GetUserByEmailQuery): Promise<User | null> {
        const { email } = query;
        try {
            const user = await this.userRepository.getUserByEmail(email.toLowerCase());
            if (!user) {
                return null;
            }
            const userEntity = new UserEntity(user);
            userEntity.toLowerCase();
            return userEntity;
        } catch (error) {
            this.logger.error(error);
            return null;
        }
    }
}
