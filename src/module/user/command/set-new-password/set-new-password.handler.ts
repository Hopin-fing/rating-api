import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../user.repository';
import { Logger } from '@nestjs/common';
import { SetNewPasswordCommand } from './set-new-password.command';
import { SetNewPasswordResponse, SetNewPasswordResponseEnum } from '@libs/contracts/commands/auth/enums/set-new-password.response.enum';
import { UserEntity } from '../../entities/user.entity';

@CommandHandler(SetNewPasswordCommand)
export class SetNewPasswordHandler implements ICommandHandler<SetNewPasswordCommand> {
    public readonly logger = new Logger(SetNewPasswordHandler.name);

    constructor(private readonly userRepository: UserRepository) {}

    async execute(command: SetNewPasswordCommand): Promise<SetNewPasswordResponse> {
        try {
            const { userId, newPassword } = command;
            let userEntity = new UserEntity({ uuid: userId });
            userEntity = await userEntity.setPassword(newPassword);
            await this.userRepository.setNewPassword(userEntity.uuid, userEntity.passwordHash);

            return SetNewPasswordResponseEnum.Success;
        } catch (error) {
            this.logger.error(`Error: ${JSON.stringify(error)}`);
            return SetNewPasswordResponseEnum.Error;
        }
    }
}
