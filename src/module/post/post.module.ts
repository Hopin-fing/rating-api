import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERIES } from './query';
import { PostRepository } from './post.repository';
import { COMMANDS } from './command';
import { DatabaseModule } from '@common/database';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [PostController],
    providers: [...QUERIES, ...COMMANDS, PostRepository, JwtService],
})
export class PostModule {}
