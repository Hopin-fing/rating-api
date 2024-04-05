import { createZodDto } from 'nestjs-zod';
import { SearchPostCommand } from '@libs/contracts/commands';

export class SearchPostsRequestDto extends createZodDto(SearchPostCommand.RequestSchema) {}
export class SearchPostsResponseDto extends createZodDto(SearchPostCommand.ResponseSchema) {}
