import { CategorySchema } from '../../models';
import { z } from 'zod';

const GetCategoryResponseSchema = CategorySchema.merge(
    z.object({
        postCount: z.number(),
    }),
);

export namespace GetCategoryCommand {
    export const ResponseSchema = GetCategoryResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
