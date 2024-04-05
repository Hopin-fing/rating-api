import { createZodDto } from 'nestjs-zod';
import { DeleteCategoryCommand } from '@libs/contracts/commands';

export class DeleteCategoryDto extends createZodDto(DeleteCategoryCommand.RequestSchema) {}
export class DeleteCategoryResponseDto extends createZodDto(DeleteCategoryCommand.ResponseSchema) {}
