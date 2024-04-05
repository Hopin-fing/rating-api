import { $Enums, Review } from '@prisma/client';

export class ReviewEntity implements Review {
    uuid: string;
    title: string;
    description: string;
    rating: number;
    updatedAt: Date;
    publishedAt: Date;
    productUuid: string;
    userUuid: string;
    likes: number;
    dislikes: number;
    status: $Enums.ReviewStatus;

    constructor(review: Partial<Review>) {
        Object.assign(this, review);
        return this;
    }

    isApproved() {
        return this.status === $Enums.ReviewStatus.APPROVED;
    }

    isRejected() {
        return this.status === $Enums.ReviewStatus.REJECTED;
    }

    isNew() {
        return this.status === $Enums.ReviewStatus.NEW;
    }
}
