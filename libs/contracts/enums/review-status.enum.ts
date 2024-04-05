import { z } from 'zod';

export const ReviewStatus = z.enum(['NEW', 'APPROVED', 'REJECTED']);
