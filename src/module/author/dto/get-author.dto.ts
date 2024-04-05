import { createZodDto } from 'nestjs-zod';
import { GetAuthorCommand } from '@libs/contracts/commands/author/get.command';

export class GetAuthorResponseDto extends createZodDto(GetAuthorCommand.ResponseSchema) {}
