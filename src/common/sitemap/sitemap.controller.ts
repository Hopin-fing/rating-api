import { Controller, Get, Headers, Header } from '@nestjs/common';
import { subDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { ISitemapItem } from './sitemap.interface';
import { QueryBus } from '@nestjs/cqrs';
import { FindPostsQuery } from '../../module/post/query/find-posts/find-posts.query';
import { Post } from '@prisma/client';

@Controller('sitemap')
export class SitemapController {
    constructor(private readonly queryBus: QueryBus) {}

    @Get('xml')
    @Header('content-type', 'text/xml')
    async sitemap(@Headers('host') host: string) {
        let res: ISitemapItem[];
        const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
        res = [
            {
                loc: `https://${host}`,
                lastmod: format(subDays(new Date(), 1), formatString),
                changefreq: 'daily',
                priority: '1.0',
            },
        ];
        const data = await this.queryBus.execute<FindPostsQuery, { posts: Post[] }>(
            new FindPostsQuery({
                limit: 100000,
                offset: 0,
                domain: host,
            }),
        );
        res = res.concat(
            data.posts.map(post => {
                return {
                    loc: `https://${host}/${post.alias}`,
                    lastmod: format(new Date(post.updatedAt), formatString),
                    changefreq: 'weekly',
                    priority: '0.7',
                };
            }),
        );
        const builder = new Builder({
            xmldec: { version: '1.0', encoding: 'UTF-8' },
        });
        return builder.buildObject({
            urlset: {
                $: {
                    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                },
                url: res,
            },
        });
    }
}
