import { PrismaService } from '@common/database/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { PostEntity } from './entities/post.entity';
import { AuthorEntity } from '../author/entities/author.entity';
import { Injectable } from '@nestjs/common';
import { FindPostsRequestDto } from './dto/find-posts.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostsRequestDto } from './dto/search-posts.dto';

@Injectable()
export class PostRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async create(dto: PostEntity, userId: string): Promise<Post> {
        return this.prisma.post.create({
            data: {
                ...dto,
                creatorUuid: userId,
                lastEditorUuid: userId,
            },
        });
    }

    public async createPostWithRelations(dto: PostEntity, author: AuthorEntity, userId: string): Promise<Post> {
        const { uuid } = await this.prisma.author.create({
            data: { ...author },
        });
        return this.create({ ...dto, authorUuid: uuid }, userId);
    }

    public async updateById(post: UpdatePostDto, userId: string) {
        return this.prisma.post.update({
            where: { uuid: post.uuid },
            data: { ...post, lastEditorUuid: userId, updatedAt: new Date() },
            select: { uuid: true },
        });
    }

    public async updateViewsByPostId(id: string, views: number) {
        return this.prisma.post.update({
            where: { uuid: id },
            data: { views },
            select: { uuid: true },
        });
    }

    async findAndCountAdmin({ category, status, direction, limit, offset, search, domain }: FindPostsRequestDto) {
        return this.findAndCount({ category, status, direction, limit, offset, search, domain });
    }

    async findAndCountPublic({ category, direction, limit, offset, domain }: SearchPostsRequestDto) {
        return this.findAndCount({ category, status: 'PUBLISHED', direction, limit, offset, domain });
    }

    public async getById(id: string) {
        return this.prisma.post.findFirst({
            where: { uuid: id },
            include: {
                category: true,
                author: true,
                products: { include: { assessments: true } },
                questionAnswers: true,
            },
        });
    }

    public async getSimilarPosts(categoryUUID: string, date: Date) {
        return this.prisma.post.findMany({
            where: {
                category: {
                    uuid: categoryUUID,
                },
                createdAt: {
                    lt: date,
                },
            },
            include: {
                category: {
                    select: {
                        title: true,
                        alias: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 12,
        });
    }

    public async getWithRelationsByAlias(alias: string) {
        return this.prisma.post.findFirst({
            where: {
                alias,
            },
            include: {
                domain: true,
                category: true,
                author: true,
                products: { include: { assessments: true } },
                questionAnswers: true,
            },
        });
    }

    async addView(id: string) {
        return this.prisma.post.update({
            where: { uuid: id },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
    }

    public async deleteById(id: string): Promise<Pick<Post, 'uuid'>> {
        const { uuid } = await this.prisma.post.delete({
            where: { uuid: id },
        });

        return { uuid };
    }

    private async findAndCount({ category, status, direction, limit, offset, search, domain }: FindPostsRequestDto) {
        const filter = {
            where: { status, category: { title: category } },
            orderBy: {
                createdAt: direction ?? 'desc',
            },
        } as Prisma.PostFindManyArgs & { where: Prisma.PostWhereInput };

        if (search) {
            filter.where.title = { contains: search, mode: 'insensitive' };
        }
        if (domain) {
            filter.where.domain = {
                name: domain,
            };
        }
        const posts = await this.prisma.post.findMany({
            ...filter,
            skip: Number(offset),
            take: Number(limit),
            include: {
                category: { select: { title: true, alias: true } },
            },
        });
        const total = await this.prisma.post.count(filter as Prisma.PostCountArgs);

        return { posts, total };
    }
}
