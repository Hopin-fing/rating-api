import { PrismaService } from '@common/database/prisma.service';
import { Prisma, $Enums } from '@prisma/client';
import { Post, Product } from '@prisma/client';
import { ProductEntity } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { AssessmentsEntity } from './entities/assessments.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
    constructor(private readonly prisma: PrismaService) {}
    public async createProductWithRelations(product: ProductEntity, assessments: AssessmentsEntity): Promise<Product> {
        return this.prisma.product.create({
            data: {
                ...product,
                assessments: {
                    create: {
                        ...assessments,
                    },
                },
            },
        });
    }

    public async updateById(product: UpdateProductDto): Promise<Pick<Product, 'uuid'>> {
        return this.prisma.product.update({
            where: { uuid: product.uuid },
            data: { ...product },
            select: { uuid: true },
        });
    }

    public async addLike(id: string): Promise<void> {
        await this.prisma.assessments.update({
            where: { productUuid: id },
            data: {
                like: {
                    increment: 1,
                },
            },
        });
    }

    public async addDislike(id: string): Promise<void> {
        await this.prisma.assessments.update({
            where: { productUuid: id },
            data: {
                dislike: {
                    increment: 1,
                },
            },
        });
    }

    public async removeLike(id: string): Promise<void> {
        await this.decrementAssessment(id, 'like');
    }

    public async removeDislike(id: string): Promise<void> {
        await this.decrementAssessment(id, 'dislike');
    }

    public async updateAssessmentsByProductId(
        id: string,
        likes?: number,
        dislikes?: number,
    ): Promise<Pick<AssessmentsEntity, 'productUuid'>> {
        const { productUuid } = await this.prisma.assessments.update({
            where: { productUuid: id },
            data: {
                like: likes,
                dislike: dislikes,
            },

            select: {
                productUuid: true,
            },
        });
        return { productUuid };
    }

    public async getById(id: string) {
        return this.prisma.product.findFirst({
            where: { uuid: id },
            include: {
                assessments: true,
            },
        });
    }

    public async getByIdWithReviews(id: string) {
        return this.prisma.product.findFirst({
            where: { uuid: id },
            include: {
                assessments: true,
                reviews: {
                    where: {
                        status: $Enums.ReviewStatus.APPROVED,
                    },
                },
            },
        });
    }

    public async deleteById(id: string): Promise<Pick<Post, 'uuid'>> {
        return this.prisma.product.delete({
            where: { uuid: id },
        });
    }

    private async decrementAssessment(id: string, type: 'like' | 'dislike'): Promise<void> {
        const assessment = await this.prisma.assessments.findUnique({
            where: { productUuid: id },
            select: { [type]: true },
        });

        if (assessment && assessment[type] > 0) {
            await this.prisma.assessments.update({
                where: { productUuid: id },
                data: {
                    [type]: {
                        decrement: 1,
                    },
                },
            });
        }
    }

    public async incrementClickCount(productId: string): Promise<Pick<Product, 'uuid'> | Error | Prisma.PrismaClientKnownRequestError> {
        return this.prisma.product.update({
            where: { uuid: productId },
            data: {
                clickCount: {
                    increment: 1,
                },
            },
            select: { uuid: true },
        });
    }
}
