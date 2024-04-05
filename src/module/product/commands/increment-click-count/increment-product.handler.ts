import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncrementClickCountCommand } from './increment-product.command';
import { ProductRepository } from '../../product.repository';

@CommandHandler(IncrementClickCountCommand)
export class IncrementClickCountHandler implements ICommandHandler<IncrementClickCountCommand> {
    constructor(private readonly productRepository: ProductRepository) {}
    async execute({ productId }: IncrementClickCountCommand) {
        return this.productRepository.incrementClickCount(productId);
    }
}
