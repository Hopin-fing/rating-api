import { AssessmentsSchema, AuthorSchema, CategorySchema, PostSchema, ProductSchema, QuestionAnswerSchema } from '../../models';
import { z } from 'zod';

const GetPostWithRelationsResponseSchema = PostSchema.merge(
    z.object({
        category: CategorySchema,
        author: AuthorSchema,
        products: z.array(
            ProductSchema.merge(
                z.object({
                    assessments: z.array(AssessmentsSchema),
                }),
            ),
        ),
        domain: z.object({ name: z.string(), uuid: z.string() }),
        questionAnswers: z.array(QuestionAnswerSchema),
        similarPosts: z.array(
            PostSchema.merge(
                z.object({
                    category: CategorySchema.pick({ title: true, alias: true }),
                }),
            ),
        ),
    }),
);

const GetPostsResponseSchema = z.object({
    posts: z.array(PostSchema),
});

export namespace GetPostWithRelationsCommand {
    export const ResponseSchema = GetPostWithRelationsResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}

export namespace GetPostsCommand {
    export const ResponseSchema = GetPostsResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
