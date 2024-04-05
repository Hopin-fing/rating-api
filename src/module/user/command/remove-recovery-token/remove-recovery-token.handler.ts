import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { Logger } from '@nestjs/common';
import { RemoveRecoveryTokenCommand } from './remove-recovery-token.command';

@CommandHandler(RemoveRecoveryTokenCommand)
export class RemoveRecoveryTokenHandler implements ICommandHandler<RemoveRecoveryTokenCommand> {
    public readonly logger = new Logger(RemoveRecoveryTokenHandler.name);

    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: RemoveRecoveryTokenCommand): Promise<boolean> {
        try {
            await this.userRepository.removeRecoveryToken(command.userId);

            return true;
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error)}`);

            return false;
        }
    }
}
