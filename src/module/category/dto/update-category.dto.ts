import { createZodDto } from 'nestjs-zod';
import { UpdateCategoryCommand } from '@libs/contracts/commands';

export class UpdateCategoryDto extends createZodDto(UpdateCategoryCommand.RequestSchema) {}
export class UpdateCategoryResponseDto extends createZodDto(UpdateCategoryCommand.ResponseSchema) {}
