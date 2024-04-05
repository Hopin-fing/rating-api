import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from '@prisma/client';
import { UserRepository } from '../../user.repository';
import { BadRequestException, Logger } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    public readonly logger = new Logger(CreateUserHandler.name);

    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: CreateUserCommand): Promise<User> {
        const { email, name, role, password } = command;
        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Пользователь с таким email уже существует');
        }

        const user = new UserEntity({ email, name, role });
        await user.setPassword(password);
        user.toLowerCase();

        return await this.userRepository.createUser(user);
    }
}
