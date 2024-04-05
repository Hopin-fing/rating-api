import { CreateReviewCommand } from '@libs/contracts/commands/review';
import { createZodDto } from 'nestjs-zod';

export class CreateReviewDto extends createZodDto(CreateReviewCommand.RequestSchema) {}
export class CreateReviewResponseDto extends createZodDto(CreateReviewCommand.ResponseSchema) {}
