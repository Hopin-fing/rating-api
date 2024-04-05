import { ProductSchema } from '../../models';
import { z } from 'zod';

const CreateProductRequestSchema = ProductSchema.omit({ uuid: true, createdAt: true, updatedAt: true });
const CreateProductResponseSchema = ProductSchema;

export namespace CreateProductCommand {
    export const RequestSchema = CreateProductRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreateProductResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
