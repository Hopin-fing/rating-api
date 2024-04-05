import { z } from 'zod';

export const ProductSchema = z.object({
    uuid: z.string().uuid(),
    postUuid: z.string().uuid(),
    images: z.string().array(),
    title: z.string(),
    rating: z.number().min(0).max(100),
    pros: z.string().array(),
    cons: z.string().array(),
    features: z.string().array(),
    mainFeature: z.string(),
    contentMd: z.string(),
    linkButton: z.string().nullable(),
    updatedAt: z.date(),
    createdAt: z.date(),
});
