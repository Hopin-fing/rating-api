import { QuestionAnswerSchema } from '../../models';
import { z } from 'zod';

const CreateQuestionAnswerRequestSchema = QuestionAnswerSchema.omit({ uuid: true, createdAt: true, updatedAt: true });
const CreateQuestionAnswerResponseSchema = QuestionAnswerSchema.pick({ uuid: true });

export namespace CreateQuestionAnswerCommand {
    export const RequestSchema = CreateQuestionAnswerRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = CreateQuestionAnswerResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
