import { createZodDto } from 'nestjs-zod';
import { CreateQuestionAnswerCommand } from '@libs/contracts/commands';

export class CreateQuestionAnswerDto extends createZodDto(CreateQuestionAnswerCommand.RequestSchema) {}
export class CreateQuestionAnswerResponseDto extends createZodDto(CreateQuestionAnswerCommand.ResponseSchema) {}
