import { AuthorSchema, PostSchema } from '../../models';
import { z } from 'zod';

const CreatePostRequestSchema = PostSchema.omit({
    uuid: true,
    views: true,
    lastEditorUuid: true,
    createdAt: true,
    updatedAt: true,
}).merge(
    z.object({
        author: AuthorSchema.omit({
            uuid: true,
            postUuid: true,
            createdAt: true,
            updatedAt: true,
        }).optional(),
        authorUuid: z.string().uuid(),
    }),
);
const CreatePostResponseSchema = PostSchema;

export namespace CreatePostCommand {
    export const RequestSchema = CreatePostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreatePostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
