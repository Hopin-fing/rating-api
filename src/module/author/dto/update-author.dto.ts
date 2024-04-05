import { createZodDto } from 'nestjs-zod';
import { UpdateAuthorCommand } from '@libs/contracts/commands/author';

export class UpdateAuthorDto extends createZodDto(UpdateAuthorCommand.RequestSchema) {}
export class UpdateAuthorResponseDto extends createZodDto(UpdateAuthorCommand.ResponseSchema) {}
