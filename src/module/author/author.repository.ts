import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/database/prisma.service';
import { Author } from '@prisma/client';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async getById(id: string) {
        return this.prisma.author.findFirst({
            where: { uuid: id },
        });
    }

    public async getByIdWithRelations(id: string) {
        return this.prisma.author.findFirst({
            where: { uuid: id },
            include: {
                posts: true,
            },
        });
    }

    async find() {
        const authors = await this.prisma.author.findMany();
        return { authors };
    }

    public async create({ photo, name, order, position }: CreateAuthorDto): Promise<Author> {
        return this.prisma.author.create({
            data: {
                photo,
                name,
                order,
                position,
            },
        });
    }

    public async updateById(dto: UpdateAuthorDto): Promise<Pick<Author, 'uuid'>> {
        return this.prisma.author.update({
            where: { uuid: dto?.uuid },
            data: { ...dto },
            select: { uuid: true },
        });
    }

    public async deleteById(id: string): Promise<Pick<Author, 'uuid'>> {
        const { uuid } = await this.prisma.author.delete({
            where: { uuid: id },
        });

        return { uuid };
    }
}
