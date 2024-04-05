import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/database/prisma.service';
import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    public async createUser({ email, name, role, passwordHash }: UserEntity): Promise<User> {
        return this.prisma.user.create({
            data: { email, name, role, passwordHash },
        });
    }

    public async getUserById(uuid: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                uuid,
            },
        });
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    public async getUserByRecoveryToken(recoveryToken: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                recoveryToken,
            },
        });
    }

    public async addRecoveryToken(uuid: string, token: string): Promise<User> {
        return this.prisma.user.update({
            where: {
                uuid,
            },
            data: {
                recoveryToken: token,
            },
        });
    }

    public async removeRecoveryToken(uuid: string): Promise<User> {
        return this.prisma.user.update({
            where: {
                uuid,
            },
            data: {
                recoveryToken: null,
            },
        });
    }

    public async setNewPassword(uuid: string, passwordHash: string): Promise<User> {
        return this.prisma.user.update({
            where: {
                uuid,
            },
            data: {
                passwordHash,
            },
        });
    }

    public async updateUser({ uuid, ...rest }: Pick<UserEntity, 'avatar' | 'description' | 'name' | 'uuid'>): Promise<User> {
        return await this.prisma.user.update({
            where: {
                uuid,
            },
            data: {
                ...rest,
            },
        });
    }
}
