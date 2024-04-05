import { AssessmentsSchema, ProductSchema, ReviewSchema } from '../../models';
import { z } from 'zod';

const GetProductWithRelationsResponseSchema = ProductSchema.merge(
    z.object({
        assessments: z.array(AssessmentsSchema),
        reviews: z.array(ReviewSchema),
    }),
);

export namespace GetProductWithRelationsCommand {
    export const ResponseSchema = GetProductWithRelationsResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
