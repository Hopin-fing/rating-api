import { UpdateProductDto } from '../../dto/update-product.dto';

export class UpdateProductCommand {
    constructor(public readonly dto: UpdateProductDto) {}
}
