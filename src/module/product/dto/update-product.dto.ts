import { createZodDto } from 'nestjs-zod';
import { UpdateProductCommand } from '@libs/contracts/commands';

export class UpdateProductDto extends createZodDto(UpdateProductCommand.RequestSchema) {}
export class UpdateProductResponseDto extends createZodDto(UpdateProductCommand.ResponseSchema) {}
