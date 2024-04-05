import { createZodDto } from 'nestjs-zod';
import { UserRefreshTokenCommand } from '@libs/contracts/index';

export class RefreshTokenDto extends createZodDto(UserRefreshTokenCommand.RequestSchema) {}

export class RefreshTokenResponseDto extends createZodDto(UserRefreshTokenCommand.ResponseSchema) {}
