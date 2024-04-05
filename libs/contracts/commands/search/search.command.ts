import { CategorySchema, PostSchema, ProductSchema, SearchSchema } from '../../models';
import { z } from 'zod';

export const SearchRequestSchema = SearchSchema;
export const SearchResponseSchema = z.object({
    posts: z.array(
        PostSchema.merge(
            z.object({
                products: z.array(ProductSchema),
                category: CategorySchema.pick({ title: true, alias: true }),
            }),
        ),
    ),
    totalPage: z.number(),
    page: z.number(),
});

export namespace SearchCommand {
    export const RequestSchema = SearchRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = SearchResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
