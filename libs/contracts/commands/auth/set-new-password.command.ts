import { z } from 'zod';
import { SetNewPasswordResponseEnum } from './enums/set-new-password.response.enum';

const SetNewPasswordRequestSchema = z.object({
    recoveryToken: z.string(),
    newPassword: z.string(),
});

const SetNewPasswordResponseSchema = z.object({
    status: z.nativeEnum(SetNewPasswordResponseEnum),
});

export namespace SetNewPasswordCommand {
    export const RequestSchema = SetNewPasswordRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = SetNewPasswordResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
