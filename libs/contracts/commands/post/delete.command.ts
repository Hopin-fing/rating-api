import { PostSchema } from '../../models';
import { z } from 'zod';

const DeletePostRequestSchema = PostSchema.pick({ uuid: true });
const DeletePostResponseSchema = z.object({ uuid: z.string().uuid() });

export namespace DeletePostCommand {
    export const RequestSchema = DeletePostRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = DeletePostResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
