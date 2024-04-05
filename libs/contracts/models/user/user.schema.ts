import { z } from 'zod';
import { UserRole } from '../../enums';

export const UserSchema = z.object({
    uuid: z.string().uuid(),
    email: z.string().email(),
    name: z.string(),
    description: z.string().nullable(),
    avatar: z.string().nullable(),
    role: UserRole,
    passwordHash: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
