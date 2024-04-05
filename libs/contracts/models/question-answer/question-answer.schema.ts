import { z } from 'zod';

export const QuestionAnswerSchema = z.object({
    uuid: z.string().uuid(),
    postUuid: z.string().uuid(),
    question: z.string(),
    answer: z.string(),
    updatedAt: z.date(),
    createdAt: z.date(),
});
