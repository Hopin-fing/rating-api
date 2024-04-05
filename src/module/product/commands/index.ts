import { CreateProductHandler } from './create-product/create-product.handler';
import { UpdateProductHandler } from './update-product/update-product.handler';
import { DeleteProductHandler } from './delete-product/delete-product.handler';
import { IncrementClickCountHandler } from './increment-click-count/increment-product.handler';

export const COMMANDS = [CreateProductHandler, UpdateProductHandler, IncrementClickCountHandler, DeleteProductHandler];
