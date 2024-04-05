import { AssessmentsSchema } from '../../models';
import { z } from 'zod';

const UpdateAssessmentsRequestSchema = AssessmentsSchema.omit({ uuid: true, createdAt: true, updatedAt: true }).merge(
    z.object({
        like: z.number().min(0).optional(),
        dislike: z.number().min(0).optional(),
    }),
);
const UpdateAssessmentsResponseSchema = AssessmentsSchema.pick({ uuid: true });

export namespace UpdateAssessmentsCommand {
    export const RequestSchema = UpdateAssessmentsRequestSchema;
    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = UpdateAssessmentsResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
