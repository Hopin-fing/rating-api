export enum SetNewPasswordResponseEnum {
    VerificationCodeNotFound = 'VerificationCodeNotFound',
    Success = 'Success',
    Error = 'Error',
}

export type SetNewPasswordResponse = `${SetNewPasswordResponseEnum}`;
