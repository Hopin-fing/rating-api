import { createZodDto } from 'nestjs-zod';
import { DeleteAuthorCommand } from '@libs/contracts/commands/author';

export class DeleteAuthorDto extends createZodDto(DeleteAuthorCommand.RequestSchema) {}
export class DeleteAuthorResponseDto extends createZodDto(DeleteAuthorCommand.ResponseSchema) {}
