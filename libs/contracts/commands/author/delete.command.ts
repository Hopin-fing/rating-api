import { AuthorSchema } from '../../models';
import { z } from 'zod';

const DeleteAuthorRequestSchema = AuthorSchema.pick({ uuid: true });
const DeleteAuthorResponseSchema = z.object({ uuid: z.string().uuid() });

export namespace DeleteAuthorCommand {
    export const RequestSchema = DeleteAuthorRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = DeleteAuthorResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
