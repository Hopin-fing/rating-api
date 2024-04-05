import { z } from 'zod';

export const CategorySchema = z.object({
    uuid: z.string(),
    title: z.string(),
    order: z.number(),
    alias: z.string(),
    updatedAt: z.date(),
    createdAt: z.date(),
});
