import { createZodDto } from 'nestjs-zod';
import { DeleteQuestionAnswerCommand } from '@libs/contracts/commands';

export class DeleteQuestionAnswerDto extends createZodDto(DeleteQuestionAnswerCommand.RequestSchema) {}
export class DeleteQuestionAnswerResponseDto extends createZodDto(DeleteQuestionAnswerCommand.ResponseSchema) {}
