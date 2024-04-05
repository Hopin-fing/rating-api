import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { Logger } from '@nestjs/common';
import { AddRecoveryTokenCommand } from './add-recovery-token.command';

@CommandHandler(AddRecoveryTokenCommand)
export class AddRecoveryTokenHandler implements ICommandHandler<AddRecoveryTokenCommand> {
    public readonly logger = new Logger(AddRecoveryTokenHandler.name);

    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: AddRecoveryTokenCommand) {
        try {
            return await this.userRepository.addRecoveryToken(command.userId, command.recoveryToken);
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error)}`);
            return null;
        }
    }
}
