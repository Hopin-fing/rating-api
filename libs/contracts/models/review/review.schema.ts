import { z } from 'zod';
import { ReviewStatus } from '../../enums/review-status.enum';

export const ReviewSchema = z.object({
    uuid: z.string().uuid(),
    description: z.string(),
    rating: z.number().min(0).max(100),
    publishedAt: z.date(),
    updatedAt: z.date(),
    productUuid: z.string().uuid(),
    userUuid: z.string().uuid(),
    likes: z.number().positive(),
    dislikes: z.number().positive(),
    status: ReviewStatus,
});
