import { Module } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { DatabaseModule } from '@common/database';
import { CategoryController } from './category.controller';
import { COMMANDS } from './command';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [CategoryController],
    providers: [...COMMANDS, CategoryRepository],
})
export class CategoryModule {}
