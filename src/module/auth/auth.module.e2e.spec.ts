import { DatabaseModule } from '@common/database';
import { validateConfig } from '@common/utils';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { UserEntity } from '../user/entities/user.entity';
import { GetUserByEmailHandler } from '../user/query/get-user-by-email';
import { UserModule } from '../user/user.module';
import { AuthModule } from './auth.module';

describe('Auth Testing', () => {
    let app: INestApplication;
    let tokens: {
        accessToken: string;
        refreshToken: string;
    } | null = null;
    const mockUser: UserEntity = new UserEntity({
        email: 'test-user@gmail.com',
        name: 'UserName',
        role: 'USER',
        uuid: 'uuid',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    mockUser.setPassword('123456');

    let handler: GetUserByEmailHandler;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AuthModule,
                DatabaseModule,
                ConfigModule.forRoot({
                    isGlobal: true,
                    validate: config => validateConfig(config),
                }),
                UserModule,
            ],
        }).compile();

        handler = moduleRef.get<GetUserByEmailHandler>(GetUserByEmailHandler);
        app = moduleRef.createNestApplication();
        await app.init();

        // get token for all requests
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockUser));
        const res = await request(app.getHttpServer()).post('/auth/login').send({
            email: 'test-user@gmail.com',
            password: '123456',
        });
        tokens = res.body;
    });

    it(`login - success`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockUser));
        const res = await request(app.getHttpServer()).post('/auth/login').send({
            email: 'test-user@gmail.com',
            password: '123456',
        });
        expect(res.statusCode).toEqual(201);
    });

    it(`login - error - wrong password or email`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockUser));
        const res = await request(app.getHttpServer()).post('/auth/login').send({
            email: 'not-exist@gmail.com',
            password: 'wrong password',
        });
        expect(res.statusCode).toEqual(400);
    });

    it(`refresh Token success`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockUser));
        //tokens.refreshToken -> response code 400 !!!
        const res = await request(app.getHttpServer())
            .post('/auth/refresh-token')
            .set('Authorization', `Bearer ${tokens.refreshToken}`)
            .send();
        expect(res.statusCode).toEqual(201);
    });

    it(`refresh Token error - not valid`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockUser));
        // token with another secret or expired
        const mockWrongToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InJvbGUiOiJVU0VSIiwiaWQiOiIwZDg3MDY4Yy1kMzczLTRlMDItOWUyNi0zMTIxOTFmMzMyOTYifSwiaWF0IjoxNzA1ODc1NTUwLCJleHAiOjE3MDU4ODI3NTB9.Nlp3VxQtbLjvhSjvV5ULUAiBZJIxRk3alpc_oiye3X4';
        const res = await request(app.getHttpServer()).post('/auth/refresh-token').set('Authorization', `Bearer ${mockWrongToken}`).send();
        expect(res.statusCode).toEqual(401);
    });

    it(`refresh Token error - empty token`, async () => {
        jest.spyOn(handler, 'execute').mockImplementation(() => Promise.resolve(mockUser));
        const res = await request(app.getHttpServer()).post('/auth/refresh-token').send();
        expect(res.statusCode).toEqual(401);
    });

    afterAll(async () => {
        await app.close();
    });
});
