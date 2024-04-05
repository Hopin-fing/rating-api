import { ReviewSchema } from '../../models';
import { z } from 'zod';

const CreateReviewRequestSchema = ReviewSchema.pick({
    description: true,
    rating: true,
    productUuid: true,
});

const CreateReviewResponseSchema = ReviewSchema;

export namespace CreateReviewCommand {
    export const RequestSchema = CreateReviewRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreateReviewResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
