import { createZodDto } from 'nestjs-zod';
import { GetReviewsForUserCommand } from '@libs/contracts/commands/review';

export class GetReviewsForUserDto extends createZodDto(GetReviewsForUserCommand.RequestSchema) {}
export class GetReviewsForUserResponseDto extends createZodDto(GetReviewsForUserCommand.ResponseSchema) {}
