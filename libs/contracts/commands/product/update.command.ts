import { ProductSchema } from '../../models';
import { z } from 'zod';

const UpdateProductRequestSchema = ProductSchema.omit({ postUuid: true, createdAt: true, updatedAt: true }).partial();
const UpdateProductResponseSchema = ProductSchema.pick({ uuid: true });

export namespace UpdateProductCommand {
    export const RequestSchema = UpdateProductRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdateProductResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
