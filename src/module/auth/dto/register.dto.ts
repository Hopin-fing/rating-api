import { createZodDto } from 'nestjs-zod';
import { UserRegisterCommand } from '@libs/contracts/index';

export class RegisterDto extends createZodDto(UserRegisterCommand.RequestSchema) {}

export class RegisterResponseDto extends createZodDto(UserRegisterCommand.ResponseSchema) {}
