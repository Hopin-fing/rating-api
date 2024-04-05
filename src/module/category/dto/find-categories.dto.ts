import { createZodDto } from 'nestjs-zod';
import { FindCategoriesCommand } from '@libs/contracts/commands';

export class FindCategoriesRequestSchema extends createZodDto(FindCategoriesCommand.RequestSchema) {}
export class FindCategoriesResponseDto extends createZodDto(FindCategoriesCommand.ResponseSchema) {}
