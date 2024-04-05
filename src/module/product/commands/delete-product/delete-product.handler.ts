import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { ProductRepository } from '../../product.repository';
import { DeleteProductResponseDto } from '../../dto/delete-product.dto';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute({ id }: DeleteProductCommand): Promise<DeleteProductResponseDto> {
        return this.productRepository.deleteById(id);
    }
}
