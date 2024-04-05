import { z } from 'zod';
import { ProductSchema, ReviewSchema } from '../../models';
import { ReviewStatus } from '../../enums/review-status.enum';
import { DirectionSort } from '../../enums';

const GetReviewsForAdminRequestSchema = z.object({
    limit: z
        .custom<number>()
        .refine(value => value ?? false, 'Required')
        .refine(value => Number.isFinite(Number(value)), 'Invalid number')
        .transform(value => Number(value)),
    offset: z
        .custom<number>()
        .refine(value => value ?? false, 'Required')
        .refine(value => Number.isFinite(Number(value)), 'Invalid number')
        .transform(value => Number(value)),
    status: ReviewStatus.optional(),
    direction: DirectionSort.optional(),
});

const GetReviewsForAdminResponseSchema = z.object({
    reviews: z.array(ReviewSchema.merge(z.object({ product: ProductSchema }))),
    total: z.number(),
    offset: z.number(),
    limit: z.number(),
});

export namespace GetReviewsForAdminCommand {
    export const RequestSchema = GetReviewsForAdminRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = GetReviewsForAdminResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
