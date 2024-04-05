import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateRecoveryTokenCommand } from './generate-recovery-token.command';

@CommandHandler(GenerateRecoveryTokenCommand)
export class GenerateRecoveryTokenHandler implements ICommandHandler<GenerateRecoveryTokenCommand> {
    private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    async execute(command: GenerateRecoveryTokenCommand): Promise<string> {
        const { userId } = command;
        let result = '';
        const charactersLength = this.characters.length;
        for (let i = 20; i < charactersLength; i++) {
            result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `${userId}:${result}`;
    }
}
