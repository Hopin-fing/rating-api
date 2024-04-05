import { createZodDto } from 'nestjs-zod';
import { UpdatePostCommand } from '@libs/contracts/commands';

export class UpdatePostDto extends createZodDto(UpdatePostCommand.RequestSchema) {}
export class UpdatePostResponseDto extends createZodDto(UpdatePostCommand.ResponseSchema) {}
