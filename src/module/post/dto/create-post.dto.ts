import { createZodDto } from 'nestjs-zod';
import { CreatePostCommand } from '@libs/contracts/commands';

export class CreatePostDto extends createZodDto(CreatePostCommand.RequestSchema) {}
export class CreatePostResponseDto extends createZodDto(CreatePostCommand.ResponseSchema) {}
