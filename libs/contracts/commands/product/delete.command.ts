import { ProductSchema } from '../../models';
import { z } from 'zod';

const DeleteProductRequestSchema = ProductSchema.pick({ uuid: true });
const DeleteProductResponseSchema = z.object({});

export namespace DeleteProductCommand {
    export const RequestSchema = DeleteProductRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = DeleteProductResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
