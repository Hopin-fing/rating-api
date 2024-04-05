import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { COMMANDS } from './commands';
import { DatabaseModule } from '@common/database';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductRepository } from './product.repository';
import { QUERIES } from './queries';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [ProductController],
    providers: [...COMMANDS, ...QUERIES, ProductRepository],
})
export class ProductModule {}
