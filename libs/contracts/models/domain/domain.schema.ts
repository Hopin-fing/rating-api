import { z } from 'zod';

export const DomainSchema = z.object({
    uuid: z.string().uuid(),
    name: z.string(),
});
