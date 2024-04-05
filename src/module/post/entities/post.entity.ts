import { Post } from '@prisma/client';

export class PostEntity implements Post {
    uuid: string;
    views: number;
    alias: string;
    articleImage: string;
    lastEditorUuid: string;
    categoryUuid: string;
    authorUuid: string;
    creatorUuid: string;
    description: string;
    finalText: string;
    metaDescription: string;
    metaTitle: string;
    ratingName: string;
    status: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    domainUuid: string;

    constructor(post: Partial<Post>) {
        Object.assign(this, post);
        return this;
    }
}
