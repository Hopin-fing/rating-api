import { GetUserByEmailHandler } from './get-user-by-email';
import { GetUserByIdHandler } from './get-user-by-id';
import { GetUserByRecoveryTokenHandler } from './get-user-by-recovery-token';
import { GetUserInfoHandler } from './get-user-info';

export const QUERIES = [GetUserByEmailHandler, GetUserByIdHandler, GetUserByRecoveryTokenHandler, GetUserInfoHandler];
