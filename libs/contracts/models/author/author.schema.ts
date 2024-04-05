import { z } from 'zod';

export const AuthorSchema = z.object({
    uuid: z.string().uuid(),
    photo: z.string(),
    name: z.string(),
    order: z.number(),
    position: z.string(),
    updatedAt: z.date(),
    createdAt: z.date(),
});
