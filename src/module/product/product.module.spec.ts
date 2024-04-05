import { Prisma, Product } from '@prisma/client';
import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductModule } from './product.module';

import { IncrementClickCountCommand } from './commands/increment-click-count/increment-product.command';
import { GetProductQuery } from './queries/get-product/get-product.query';
import { ProductRepository } from './product.repository';
import { ConfigModule } from '@nestjs/config';
describe('Тестирование модуля Product', () => {
    let commandBus: CommandBus;
    let queryBus: QueryBus;
    let productRepository: ProductRepository;
    const productId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
    const wrongProductId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true }), ProductModule],
        }).compile();
        commandBus = moduleRef.get<CommandBus>(CommandBus);
        queryBus = moduleRef.get<QueryBus>(QueryBus);
        productRepository = moduleRef.get<ProductRepository>(ProductRepository);
        await moduleRef.init();
    });

    it('Удачный инкремент', async () => {
        jest.spyOn(productRepository, 'incrementClickCount').mockResolvedValue({ uuid: productId });
        const res = await commandBus.execute<IncrementClickCountCommand, Pick<Product, 'uuid'>>(new IncrementClickCountCommand(productId));
        expect(res.uuid).toBeDefined();
    });

    it('Неудачный инкремент', async () => {
        jest.spyOn(productRepository, 'incrementClickCount').mockRejectedValueOnce('ERROR');
        await expect(commandBus.execute(new IncrementClickCountCommand(wrongProductId))).rejects.toBeTruthy();
    });

    it('Удачное получение продукта по id', async () => {
        jest.spyOn(productRepository, 'getById').mockResolvedValue({
            uuid: productId,
            postUuid: productId,
            images: [''],
            rating: 5,
            pros: [''],
            features: [''],
            clickCount: 0,
            mainFeature: '',
            contentMd: '',
            cons: [''],
            title: 'title',
            linkButton: '',
            updatedAt: new Date(),
            createdAt: new Date(),
            assessments: [
                {
                    uuid: productId,
                    like: 0,
                    dislike: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    productUuid: productId,
                },
            ],
        });
        const res = await queryBus.execute(new GetProductQuery(productId));
        expect(res.uuid).toBeDefined();
    });
});
