import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { DatabaseModule } from '@common/database';
import { SearchRepository } from './search.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [SearchController],
    providers: [SearchRepository],
})
export class SearchModule {}
