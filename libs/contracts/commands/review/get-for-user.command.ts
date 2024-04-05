import { z } from 'zod';
import { ReviewSchema } from '../../models';

const GetReviewsForUserRequestSchema = z.object({
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
    userUuid: z.optional(z.string()),
});

const GetReviewsForUserResponseSchema = z.object({
    reviews: z.array(ReviewSchema.merge(z.object({ alias: z.optional(z.string()) }))),
    total: z.number(),
    offset: z.number(),
    limit: z.number(),
});

export namespace GetReviewsForUserCommand {
    export const RequestSchema = GetReviewsForUserRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = GetReviewsForUserResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
