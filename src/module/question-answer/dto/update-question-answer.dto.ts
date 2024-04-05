import { createZodDto } from 'nestjs-zod';
import { UpdateQuestionAnswerCommand } from '@libs/contracts/commands';

export class UpdateQuestionAnswerDto extends createZodDto(UpdateQuestionAnswerCommand.RequestSchema) {}
export class UpdateQuestionAnswerResponseDto extends createZodDto(UpdateQuestionAnswerCommand.ResponseSchema) {}
