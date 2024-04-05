import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Logger } from '@nestjs/common';
import { UserRepository } from '../../user.repository';
import { UpdateUserCommand } from './update-user.command';
import { UserUpdateResponseDto } from '../../dto/update.dto';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler implements ICommandHandler<UpdateUserCommand> {
    public readonly logger = new Logger(UpdateUserCommandHandler.name);

    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: UpdateUserCommand): Promise<UserUpdateResponseDto> {
        const user = await this.userRepository.updateUser(command);
        if (!user) {
            throw new BadRequestException('Пользователь не найден');
        }
        return user;
    }
}
