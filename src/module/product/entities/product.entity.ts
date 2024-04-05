import { Product } from '@prisma/client';

export class ProductEntity implements Product {
    cons: string[];
    contentMd: string;
    createdAt: Date;
    features: string[];
    images: string[];
    linkButton: string;
    mainFeature: string;
    postUuid: string;
    pros: string[];
    rating: number;
    title: string;
    updatedAt: Date;
    uuid: string;
    clickCount: number;

    constructor(product: Partial<Product>) {
        Object.assign(this, product);
        return this;
    }
}
