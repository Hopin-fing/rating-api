import { createZodDto } from 'nestjs-zod';
import { UpdatePostViewCommand } from '@libs/contracts/commands';

export class UpdatePostViewDto extends createZodDto(UpdatePostViewCommand.RequestSchema) {}
export class UpdatePostViewResponseDto extends createZodDto(UpdatePostViewCommand.ResponseSchema) {}
