import { z } from 'zod';

const UserRefreshTokenRequestSchema = z.object({
    refreshToken: z.string(),
});

const UserRefreshTokenResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export namespace UserRefreshTokenCommand {
    export const RequestSchema = UserRefreshTokenRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UserRefreshTokenResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
