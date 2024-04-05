import { z } from 'zod';

export const AssessmentsSchema = z.object({
    uuid: z.string().uuid(),
    productUuid: z.string().uuid(),
    like: z.number(),
    dislike: z.number(),
    updatedAt: z.date(),
    createdAt: z.date(),
});
