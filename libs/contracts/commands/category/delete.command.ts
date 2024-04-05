import { CategorySchema } from '../../models';
import { z } from 'zod';

const DeleteCategoryRequestSchema = CategorySchema.pick({ uuid: true });
const DeleteCategoryResponseSchema = z.object({});

export namespace DeleteCategoryCommand {
    export const RequestSchema = DeleteCategoryRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = DeleteCategoryResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
