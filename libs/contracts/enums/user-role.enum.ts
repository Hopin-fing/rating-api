import { z } from 'zod';

export const UserRole = z.enum(['USER', 'ADMIN']);
