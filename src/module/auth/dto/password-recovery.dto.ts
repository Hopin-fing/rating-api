import { PasswordRecoveryCommand } from '@libs/contracts/commands';
import { createZodDto } from 'nestjs-zod';

export class PasswordRecoveryDto extends createZodDto(PasswordRecoveryCommand.RequestSchema) {}
export class PasswordRecoveryResponseDto extends createZodDto(PasswordRecoveryCommand.ResponseSchema) {}
