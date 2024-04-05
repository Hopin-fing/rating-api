import { createZodDto } from 'nestjs-zod';
import { CreateProductCommand } from '@libs/contracts/commands';

export class CreateProductDto extends createZodDto(CreateProductCommand.RequestSchema) {}
export class CreateProductResponseDto extends createZodDto(CreateProductCommand.ResponseSchema) {}
