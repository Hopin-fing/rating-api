import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    controllers: [SitemapController],
    imports: [CqrsModule],
})
export class SitemapModule {}
