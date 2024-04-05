import { z } from 'zod';
import { UserSchema } from '../../models';

const UserAboutMeRequestSchema = z.object({});

const UserAboutMeResponseSchema = UserSchema.omit({ passwordHash: true, role: true });

export namespace UserAboutMeCommand {
    export const RequestSchema = UserAboutMeRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UserAboutMeResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
