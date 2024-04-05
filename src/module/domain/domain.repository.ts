import { PrismaService } from '@common/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Domain } from '@prisma/client';

@Injectable()
export class DomainRepository {
    constructor(private readonly prisma: PrismaService) {}

    public async findAll(): Promise<Domain[]> {
        return this.prisma.domain.findMany();
    }
}
