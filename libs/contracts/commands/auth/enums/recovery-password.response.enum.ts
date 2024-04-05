export enum RecoveryPasswordResponseEnum {
    UserNotFound = 'UserNotFound',
    GenerateVerifyTokenError = 'GenerateVerifyTokenError',
    GenerateHtmlError = 'GenerateHtmlError',
    SendEmailError = 'SendEmailError',
    Success = 'Success',
    Error = 'Error',
}

export type RecoveryPasswordResponse = `${RecoveryPasswordResponseEnum}`;
