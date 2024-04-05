import { AuthorSchema } from '../../models';
import { z } from 'zod';

const GetAuthorResponseSchema = AuthorSchema;

export namespace GetAuthorCommand {
    export const ResponseSchema = GetAuthorResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
