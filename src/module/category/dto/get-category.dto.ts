import { createZodDto } from 'nestjs-zod';
import { GetCategoryCommand } from '@libs/contracts/commands';

export class GetCategoryResponseDto extends createZodDto(GetCategoryCommand.ResponseSchema) {}
