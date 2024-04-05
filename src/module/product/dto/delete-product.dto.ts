import { createZodDto } from 'nestjs-zod';
import { DeleteProductCommand } from '@libs/contracts/commands';

export class DeleteProductDto extends createZodDto(DeleteProductCommand.RequestSchema) {}
export class DeleteProductResponseDto extends createZodDto(DeleteProductCommand.ResponseSchema) {}
