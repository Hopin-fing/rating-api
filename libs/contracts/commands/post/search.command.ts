import { z } from 'zod';
import { DirectionSort } from '../../enums';
import { CategorySchema, PostSchema } from '../../models';

const SearchPostRequestSchema = z.object({
    category: z.string().optional(),
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
    direction: DirectionSort.optional(),
    domain: z.string().optional(),
});

const SearchPostResponseSchema = z.object({
    posts: z.array(
        PostSchema.merge(
            z.object({
                category: CategorySchema.pick({ title: true, alias: true }),
            }),
        ),
    ),
    totalPage: z.number(),
    page: z.number(),
});

export namespace SearchPostCommand {
    export const RequestSchema = SearchPostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = SearchPostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
