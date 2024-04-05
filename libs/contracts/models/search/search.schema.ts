import { z } from 'zod';

export const SearchSchema = z.object({
    search: z.string(),
    limit: z.string().transform(val => parseInt(val, 10)),
    offset: z.string().transform(val => parseInt(val, 10)),
    domain: z.string().optional(),
});
