import { PostSchema } from '../../models';
import { z } from 'zod';

const UpdatePostViewRequestSchema = z.object({
    views: z.number().min(0, 'Просмотры не могут быть меньше 0'),
});
const UpdatePostViewResponseSchema = PostSchema.pick({ uuid: true });

export namespace UpdatePostViewCommand {
    export const RequestSchema = UpdatePostViewRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdatePostViewResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
