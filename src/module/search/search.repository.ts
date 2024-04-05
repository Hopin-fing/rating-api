import { PrismaService } from '@common/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchRepository {
    constructor(private readonly prisma: PrismaService) {}

    async search(search: string, limit: number, offset: number, domain?: string) {
        const posts = await this.prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                    {
                        products: {
                            some: { title: { contains: search } },
                        },
                    },
                ],
                domain: {
                    name: domain,
                },
            },
            include: {
                category: { select: { title: true, alias: true } },
                products: { where: { title: { contains: search } } },
            },
            take: limit,
            skip: offset,
        });
        const total = await this.prisma.post.count({
            where: {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                    {
                        products: {
                            some: { title: { contains: search } },
                        },
                    },
                ],
            },
            take: limit,
            skip: offset,
        });

        return { posts, total };
    }
}
