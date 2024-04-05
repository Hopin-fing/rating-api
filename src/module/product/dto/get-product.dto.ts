import { createZodDto } from 'nestjs-zod';
import { GetProductWithRelationsCommand } from '@libs/contracts/commands';

export class GetProductDto extends createZodDto(GetProductWithRelationsCommand.ResponseSchema) {}
