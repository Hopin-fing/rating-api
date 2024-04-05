import { AuthorSchema } from '../../models';
import { z } from 'zod';

const UpdateAuthorRequestSchema = AuthorSchema.omit({ createdAt: true, updatedAt: true }).partial();
const UpdateAuthorResponseSchema = AuthorSchema.pick({ uuid: true });

export namespace UpdateAuthorCommand {
    export const RequestSchema = UpdateAuthorRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdateAuthorResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
