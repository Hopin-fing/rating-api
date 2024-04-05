import { ChangePasswordCommand } from '@libs/contracts/commands/auth/change-password.command';
import { createZodDto } from 'nestjs-zod';

export class ChangePasswordDto extends createZodDto(ChangePasswordCommand.RequestSchema) {}
export class ChangePasswordResponseDto extends createZodDto(ChangePasswordCommand.ResponseSchema) {}
