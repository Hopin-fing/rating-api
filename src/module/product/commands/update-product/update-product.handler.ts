import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { ProductRepository } from '../../product.repository';
import { ProductEntity } from '../../entities/product.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute({ dto }: UpdateProductCommand): Promise<Pick<ProductEntity, 'uuid'>> {
        return this.productRepository.updateById(dto);
    }
}
