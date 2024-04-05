import { createZodDto } from 'nestjs-zod';
import { DeletePostCommand } from '@libs/contracts/commands';

export class DeletePostDto extends createZodDto(DeletePostCommand.RequestSchema) {}
export class DeletePostResponseDto extends createZodDto(DeletePostCommand.ResponseSchema) {}
