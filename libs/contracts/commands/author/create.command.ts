import { AuthorSchema } from '../../models';
import { z } from 'zod';

const CreateAuthorRequestSchema = AuthorSchema.omit({ uuid: true, createdAt: true, updatedAt: true });
const CreateAuthorResponseSchema = AuthorSchema;

export namespace CreateAuthorCommand {
    export const RequestSchema = CreateAuthorRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreateAuthorResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
