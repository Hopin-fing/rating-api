import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
    uuid: string;
    alias: string;
    order: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(category: Partial<Category>) {
        Object.assign(this, category);
        return this;
    }
}
