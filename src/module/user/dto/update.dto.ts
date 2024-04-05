import { UserUpdateCommand } from '@libs/contracts/commands/user';
import { createZodDto } from 'nestjs-zod';

export class UserUpdateDto extends createZodDto(UserUpdateCommand.RequestSchema) {}
export class UserUpdateResponseDto extends createZodDto(UserUpdateCommand.ResponseSchema) {}
