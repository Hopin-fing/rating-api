import { CreateUserHandler } from './create-user';
import { SetNewPasswordHandler } from './set-new-password';
import { AddRecoveryTokenHandler } from './add-recovery-token';
import { RemoveRecoveryTokenHandler } from './remove-recovery-token';
import { GenerateRecoveryTokenHandler } from './generate-recovery-token';
import { UpdateUserCommandHandler } from './update-user';

export const COMMANDS = [
    CreateUserHandler,
    SetNewPasswordHandler,
    AddRecoveryTokenHandler,
    RemoveRecoveryTokenHandler,
    GenerateRecoveryTokenHandler,
    UpdateUserCommandHandler,
];
