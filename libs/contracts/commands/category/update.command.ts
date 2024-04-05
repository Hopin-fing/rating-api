import { CategorySchema } from '../../models';
import { z } from 'zod';

const UpdateCategoryRequestSchema = CategorySchema.omit({ createdAt: true, updatedAt: true });
const UpdateCategoryResponseSchema = CategorySchema.pick({ uuid: true });

export namespace UpdateCategoryCommand {
    export const RequestSchema = UpdateCategoryRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdateCategoryResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
