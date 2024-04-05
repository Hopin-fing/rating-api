import { z } from 'zod';
import { DomainSchema } from '../../models/domain';

const GetDomainResponseSchema = z.array(DomainSchema);

export namespace GetDomainCommands {
    export const ResponseSchema = GetDomainResponseSchema;
    export type Response = z.infer<typeof ResponseSchema>;
}
