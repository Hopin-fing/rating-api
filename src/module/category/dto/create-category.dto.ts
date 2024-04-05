import { createZodDto } from 'nestjs-zod';
import { CreateCategoryCommand } from '@libs/contracts/commands';

export class CreateCategoryDto extends createZodDto(CreateCategoryCommand.RequestSchema) {}
export class CreateCategoryResponseDto extends createZodDto(CreateCategoryCommand.ResponseSchema) {}
