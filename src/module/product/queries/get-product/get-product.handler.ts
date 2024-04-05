import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { ProductRepository } from '../../product.repository';
import { GetProductDto } from '../../dto/get-product.dto';
import { BadRequestException } from '@nestjs/common';
@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
    constructor(private readonly productRepository: ProductRepository) {}
    async execute({ id }: GetProductQuery): Promise<GetProductDto> {
        const product = await this.productRepository.getByIdWithReviews(id);

        if (!product) {
            throw new BadRequestException('Такой продукт не существует');
        }

        return product;
    }
}
