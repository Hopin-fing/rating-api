import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { User } from '@prisma/client';
import { GetUserByRecoveryTokenQuery } from './get-user-by-recovery-token.query';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetUserByRecoveryTokenQuery)
export class GetUserByRecoveryTokenHandler implements IQueryHandler<GetUserByRecoveryTokenQuery> {
    constructor(private readonly userRepository: UserRepository) {}
    async execute({ recoveryToken }: GetUserByRecoveryTokenQuery): Promise<User> {
        const user = await this.userRepository.getUserByRecoveryToken(recoveryToken);
        if (!user) {
            throw new BadRequestException('Такой пользователь не найден');
        }
        return user;
    }
}
