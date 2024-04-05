import { z } from 'zod';

export const PostStatus = z.enum(['PUBLISHED', 'DRAFT']);
