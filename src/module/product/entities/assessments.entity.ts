import { Assessments } from '@prisma/client';

export class AssessmentsEntity implements Assessments {
    uuid: string;
    productUuid: string;
    dislike: number;
    like: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(assessments: Partial<Assessments>) {
        Object.assign(this, assessments);
        return this;
    }

    public static createDefaultInstance() {
        return new AssessmentsEntity({ like: 0, dislike: 0 });
    }
}
