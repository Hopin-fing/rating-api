import { z } from 'zod';
import { UserSchema } from '../../models';

const UserUpdateRequestSchema = z.object({
    avatar: z.string(),
    description: z.string(),
    name: z.string(),
});

const UserUpdateResponseSchema = UserSchema.omit({ passwordHash: true, role: true });

export namespace UserUpdateCommand {
    export const RequestSchema = UserUpdateRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UserUpdateResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
