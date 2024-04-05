import { createZodDto } from 'nestjs-zod';
import { CreateAuthorCommand } from '@libs/contracts/commands/author';

export class CreateAuthorDto extends createZodDto(CreateAuthorCommand.RequestSchema) {}
export class CreateAuthorResponseDto extends createZodDto(CreateAuthorCommand.ResponseSchema) {}
