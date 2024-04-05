import { PrismaService } from '@common/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Review, $Enums, Prisma } from '@prisma/client';
import { ReviewEntity } from './entities/review.entity';
import { DirectionSort } from '@libs/contracts/enums/direction-sort.enum';

type FindAndCountPayloadType = {
    status?: Review['status'];
    limit: number;
    offset: number;
    userUuid?: string;
    direction?: typeof DirectionSort._type;
};

@Injectable()
export class ReviewRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(review: ReviewEntity): Promise<Review> {
        return this.prisma.review.create({
            data: {
                ...review,
            },
        });
    }

    async deleteById(uuid: string): Promise<void> {
        await this.prisma.review.delete({
            where: { uuid },
        });
    }

    async getById(uuid: string): Promise<Review | null> {
        return this.prisma.review.findUnique({
            where: { uuid },
        });
    }

    public async addLike(id: string): Promise<void> {
        await this.prisma.review.update({
            where: { uuid: id },
            data: {
                likes: {
                    increment: 1,
                },
            },
        });
    }

    public async addDislike(id: string): Promise<void> {
        await this.prisma.review.update({
            where: { uuid: id },
            data: {
                dislikes: {
                    increment: 1,
                },
            },
        });
    }

    public async setStatus(id: string, status: $Enums.ReviewStatus): Promise<void> {
        await this.prisma.review.update({
            where: { uuid: id },
            data: {
                status,
            },
        });
    }

    private getFilter(whereInput: Prisma.ReviewWhereInput, direction?: typeof DirectionSort._type): Prisma.ReviewFindManyArgs {
        return {
            where: { ...whereInput },
            orderBy: {
                publishedAt: direction ?? 'desc',
            },
        };
    }

    public async findAndCountWithProduct({ direction, status, offset, limit, userUuid }: FindAndCountPayloadType) {
        const filter = this.getFilter({ status, userUuid }, direction);

        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                ...filter,
                skip: offset,
                take: limit,
                include: {
                    product: true,
                    user: false,
                },
            }),
            this.prisma.review.count(filter as Prisma.ReviewCountArgs),
        ]);

        return { reviews, total, offset, limit };
    }

    public async findAndCount({ direction, status, offset, limit, userUuid }: FindAndCountPayloadType) {
        const filter = this.getFilter({ status, userUuid }, direction);

        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                ...filter,
                skip: offset,
                take: limit,
            }),
            this.prisma.review.count(filter as Prisma.ReviewCountArgs),
        ]);

        return { reviews, total, offset, limit };
    }

    public async findAndCountWithPost({ direction, status, offset, limit, userUuid }: FindAndCountPayloadType) {
        const filter = this.getFilter({ status, userUuid }, direction);
        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                ...filter,
                skip: offset,
                take: limit,
                include: {
                    product: {
                        include: {
                            post: {
                                select: { alias: true },
                            },
                        },
                    },
                },
            }),
            this.prisma.review.count(filter as Prisma.ReviewCountArgs),
        ]);

        return { reviews, total, offset, limit };
    }
}
