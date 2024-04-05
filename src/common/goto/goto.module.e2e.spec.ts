import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../app.module';
import { GotoHashLinkCommmandHandler } from './command/goto-hash-link.handler';

describe('Тест Goto', () => {
    let app: INestApplication;
    let handler: GotoHashLinkCommmandHandler;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        handler = moduleRef.get<GotoHashLinkCommmandHandler>(GotoHashLinkCommmandHandler);
        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('Test e2e', async () => {
        const spy = jest.spyOn(handler, 'execute');
        const res = await request(app.getHttpServer()).get('/goto/aHR0cHM6Ly9oYWJyLmNvbQ==?productId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
        expect(spy).toHaveBeenCalled();
        expect(res.statusCode).toEqual(301);
    });
});
