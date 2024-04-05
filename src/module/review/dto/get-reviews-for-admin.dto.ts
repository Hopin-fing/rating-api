import { createZodDto } from 'nestjs-zod';
import { GetReviewsForAdminCommand } from '@libs/contracts/commands/review';

export class GetReviewsForAdminDto extends createZodDto(GetReviewsForAdminCommand.RequestSchema) {}
export class GetReviewsForAdminResponseDto extends createZodDto(GetReviewsForAdminCommand.ResponseSchema) {}
