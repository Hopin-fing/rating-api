import { createZodDto } from 'nestjs-zod';
import { SearchCommand } from '@libs/contracts/commands';

export class SearchDto extends createZodDto(SearchCommand.RequestSchema) {}
export class SearchResponseDto extends createZodDto(SearchCommand.ResponseSchema) {}
