import { z } from 'zod';
import { AuthorSchema } from '../../models';

const FindAuthorResponseSchema = z.object({
    authors: z.array(AuthorSchema),
});

export namespace FindAuthorCommand {
    export const ResponseSchema = FindAuthorResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
