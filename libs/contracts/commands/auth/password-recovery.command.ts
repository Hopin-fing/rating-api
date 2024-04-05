import { z } from 'zod';
import { RecoveryPasswordResponseEnum } from './enums/recovery-password.response.enum';

const PasswordRecoveryRequestSchema = z.object({
    email: z.string().email(),
});

const PasswordRecoveryResponseSchema = z.object({
    status: z.nativeEnum(RecoveryPasswordResponseEnum),
});

export namespace PasswordRecoveryCommand {
    export const RequestSchema = PasswordRecoveryRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = PasswordRecoveryResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
