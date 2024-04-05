import { z } from 'zod';
import { CategorySchema } from '../../models';

const FindCategoriesRequestSchema = z.object({
    domain: z.string().optional(),
});
const FindCategoriesResponseSchema = z.object({
    categories: z.array(
        CategorySchema.merge(
            z.object({
                postCount: z.number(),
            }),
        ),
    ),
    total: z.number(),
});

export namespace FindCategoriesCommand {
    export const RequestSchema = FindCategoriesRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = FindCategoriesResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
