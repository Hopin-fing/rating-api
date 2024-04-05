export interface IJWTPayload {
    id: string;
    role: string;
}

export interface TokenResponseDto {
    accessToken: string;
    refreshToken: string;
}
