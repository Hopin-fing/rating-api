import { createZodDto } from 'nestjs-zod';
import { UserLoginCommand } from '@libs/contracts/index';

export class LoginDto extends createZodDto(UserLoginCommand.RequestSchema) {}
export class LoginResponseDto extends createZodDto(UserLoginCommand.ResponseSchema) {}
