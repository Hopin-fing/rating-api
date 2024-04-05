import { Author } from '@prisma/client';

export class AuthorEntity implements Author {
    createdAt: Date;
    name: string;
    order: number;
    photo: string;
    position: string;
    postUuid: string;
    updatedAt: Date;
    uuid: string;
    constructor(author: Partial<Author>) {
        Object.assign(this, author);
        return this;
    }
}
