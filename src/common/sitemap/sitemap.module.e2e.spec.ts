import { DatabaseModule } from '@common/database';
import { validateConfig } from '@common/utils';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { SitemapModule } from './sitemap.module';
import { Post } from '@prisma/client';
import { PostEntity } from '../../module/post/entities/post.entity';
import { FindPostsHandler } from '../../module/post/query/find-posts/find-posts.handler';
import { PostModule } from '../../module/post/post.module';

describe('Sitemap Testing', () => {
    let app: INestApplication;
    let handler: FindPostsHandler;

    const mockPost: Post = new PostEntity({
            uuid: 'uuid',
            views: 1,
            alias: 'testAlias',
            articleImage: 'articleImage',
            lastEditorUuid: 'lastEditorUuid',
            categoryUuid: 'categoryUuid',
            authorUuid: 'authorUuid',
            creatorUuid: 'creatorUuid',
            description: 'description',
            finalText: 'finalText',
            metaDescription: 'metaDescription',
            metaTitle: 'metaTitle',
            ratingName: 'ratingName',
            status: 'status',
            title: 'title',
            createdAt: new Date(),
            updatedAt: new Date(),
            domainUuid: 'domainUuid',
        }),
        mockCategory = {
            uuid: 'uuid',
            alias: 'alias',
            order: 1,
            title: 'title',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        mockAuthor = {
            uuid: 'uuid',
            photo: 'photo',
            name: 'name',
            order: 1,
            position: 'position',
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        mockDomain = {
            uuid: 'uuid',
            name: 'test',
        },
        mockCount = {
            select: {
                posts: {
                    where: {
                        status: 'PUBLISHED',
                    },
                },
            },
            author: 1,
            category: 1,
            products: 1,
            questionAnswers: 1,
            domain: 1,
        },
        mockExtraArg = {
            category: mockCategory,
            domain: mockDomain,
            author: mockAuthor,
            questionAnswers: [] as [],
            _count: mockCount,
            products: [] as [],
        },
        mockSitemap = {
            posts: [Object.assign(mockPost, mockExtraArg)],
            totalPage: 10,
            page: 1,
        },
        mockEmptySitemap = {
            posts: [] as [],
            totalPage: 1,
            page: 1,
        },
        mockErrorSitemap = {
            posts: {} as [],
            totalPage: 1,
            page: 1,
        };
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                SitemapModule,
                DatabaseModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    validate: config => validateConfig(config),
                }),
                PostModule,
            ],
        }).compile();

        handler = moduleRef.get<FindPostsHandler>(FindPostsHandler);
        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`xml - success`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockSitemap));
        const res = await request(app.getHttpServer()).get('/sitemap/xml').send();
        expect(res.text).toContain('testAlias');
        expect(res.statusCode).toEqual(200);
    });

    it(`xml - empty`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockEmptySitemap));
        const res = await request(app.getHttpServer()).get('/sitemap/xml').send(),
            partsString = res.text.split(`<url>`).length;
        expect(partsString).toEqual(2);
        expect(res.statusCode).toEqual(200);
    });

    it(`xml - error`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockErrorSitemap));
        const res = await request(app.getHttpServer()).get('/sitemap/xml').send();
        expect(res.statusCode).toEqual(500);
    });

    afterAll(async () => {
        await app.close();
    });
});
