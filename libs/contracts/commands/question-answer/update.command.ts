import { QuestionAnswerSchema } from '../../models';
import { z } from 'zod';

const UpdateQuestionAnswerRequestSchema = QuestionAnswerSchema.omit({ createdAt: true, updatedAt: true }).partial();
const UpdateQuestionAnswerResponseSchema = QuestionAnswerSchema.pick({ uuid: true });

export namespace UpdateQuestionAnswerCommand {
    export const RequestSchema = UpdateQuestionAnswerRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdateQuestionAnswerResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
