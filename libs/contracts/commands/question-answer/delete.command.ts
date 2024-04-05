import { QuestionAnswerSchema } from '../../models';
import { z } from 'zod';

const DeleteQuestionAnswerRequestSchema = QuestionAnswerSchema.pick({ uuid: true });
const DeleteQuestionAnswerResponseSchema = z.object({});

export namespace DeleteQuestionAnswerCommand {
    export const RequestSchema = DeleteQuestionAnswerRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = DeleteQuestionAnswerResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
