import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { COMMANDS } from './commands';
import { ReviewRepository } from './review.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { QUERIES } from './query';

@Module({
    imports: [CqrsModule],
    controllers: [ReviewController],
    providers: [...COMMANDS, ...QUERIES, ReviewRepository, JwtService],
})
export class ReviewModule {}
