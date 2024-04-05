import { createZodDto } from 'nestjs-zod';
import { FindPostCommand } from '@libs/contracts/commands';

export class FindPostsRequestDto extends createZodDto(FindPostCommand.RequestSchema) {}
export class FindPostsResponseDto extends createZodDto(FindPostCommand.ResponseSchema) {}
