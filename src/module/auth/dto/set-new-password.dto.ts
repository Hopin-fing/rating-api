import { SetNewPasswordCommand } from '@libs/contracts/commands';
import { createZodDto } from 'nestjs-zod';

export class SetNewPasswordDto extends createZodDto(SetNewPasswordCommand.RequestSchema) {}
export class SetNewPasswordResponseDto extends createZodDto(SetNewPasswordCommand.ResponseSchema) {}
