import { createZodDto } from 'nestjs-zod';
import { GetPostsCommand, GetPostWithRelationsCommand } from '@libs/contracts/commands';

export class GetPostDto extends createZodDto(GetPostWithRelationsCommand.ResponseSchema) {}
export class GetPostsDto extends createZodDto(GetPostsCommand.ResponseSchema) {}
