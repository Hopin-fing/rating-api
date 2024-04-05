import { createZodDto } from 'nestjs-zod';
import { FindAuthorCommand } from '@libs/contracts/commands';
export class FindAuthorResponseDto extends createZodDto(FindAuthorCommand.ResponseSchema) {}
