import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/database/prisma.service';

import { Category } from '@prisma/client';
import { CategoryEntity } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async create(dto: CategoryEntity): Promise<Category> {
        return this.prisma.category.create({
            data: {
                ...dto,
            },
        });
    }

    public async updateById(category: UpdateCategoryDto): Promise<Pick<Category, 'uuid'>> {
        return this.prisma.category.update({
            where: { uuid: category.uuid },
            data: { ...category },
            select: { uuid: true },
        });
    }

    async findAndCount(domain?: string) {
        const categories = await this.prisma.category.findMany({
            select: {
                uuid: true,
                title: true,
                order: true,
                alias: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        posts: {
                            where: {
                                status: 'PUBLISHED',
                                domain: {
                                    name: domain,
                                },
                            },
                        },
                    },
                },
            },
        });
        const total = await this.prisma.category.count();

        return { categories, total };
    }

    public async getByAlias(alias: string) {
        return this.prisma.category.findFirst({
            where: {
                alias,
            },
            select: {
                uuid: true,
                title: true,
                order: true,
                alias: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        posts: {
                            where: {
                                status: 'PUBLISHED',
                            },
                        },
                    },
                },
            },
        });
    }

    public async getById(id: string) {
        return this.prisma.category.findFirst({
            where: {
                uuid: id,
            },
            select: {
                uuid: true,
                title: true,
                order: true,
                alias: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        posts: {
                            where: {
                                status: 'PUBLISHED',
                            },
                        },
                    },
                },
            },
        });
    }

    public async getByIdWithRelations(id: string) {
        return this.prisma.category.findFirst({
            where: {
                uuid: id,
            },
            include: {
                posts: true,
            },
        });
    }

    public async deleteById(id: string): Promise<Pick<Category, 'uuid'>> {
        return this.prisma.category.delete({
            where: { uuid: id },
        });
    }
}
