import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { ProductRepository } from '../../product.repository';
import { ProductEntity } from '../../entities/product.entity';
import { AssessmentsEntity } from '../../entities/assessments.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute({ dto }: CreateProductCommand): Promise<Pick<ProductEntity, 'uuid'>> {
        const productEntity = new ProductEntity(dto);
        const assessmentsEntity = AssessmentsEntity.createDefaultInstance();

        return this.productRepository.createProductWithRelations(productEntity, assessmentsEntity);
    }
}
