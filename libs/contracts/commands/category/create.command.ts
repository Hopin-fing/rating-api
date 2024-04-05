import { CategorySchema } from '../../models';
import { z } from 'zod';

const CreateCategoryRequestSchema = CategorySchema.omit({ uuid: true, createdAt: true, updatedAt: true });
const CreateCategoryResponseSchema = CategorySchema;

export namespace CreateCategoryCommand {
    export const RequestSchema = CreateCategoryRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreateCategoryResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
