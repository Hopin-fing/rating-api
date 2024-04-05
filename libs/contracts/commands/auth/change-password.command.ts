import { z } from 'zod';
import { ChangePasswordResponseEnum } from './enums/change-password.response.enum';

const ChangePasswordRequestSchema = z.object({
    newPassword: z.string(),
});

const ChangePasswordResponseSchema = z.object({
    status: z.nativeEnum(ChangePasswordResponseEnum),
});

export namespace ChangePasswordCommand {
    export const RequestSchema = ChangePasswordRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = ChangePasswordResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
