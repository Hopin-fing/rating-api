import { PostSchema } from '../../models';
import { z } from 'zod';

const UpdatePostRequestSchema = PostSchema.omit({ creatorUuid: true, createdAt: true, updatedAt: true }).partial();
const UpdatePostResponseSchema = PostSchema.pick({ uuid: true });

export namespace UpdatePostCommand {
    export const RequestSchema = UpdatePostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdatePostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
