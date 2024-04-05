import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductCommand } from './commands/create-product/create-product.command';
import { UpdateProductDto, UpdateProductResponseDto } from './dto/update-product.dto';
import { UpdateProductCommand } from './commands/update-product/update-product.command';
import { GetProductQuery } from './queries/get-product/get-product.query';
import { GetProductDto } from './dto/get-product.dto';
import { DeleteProductDto, DeleteProductResponseDto } from './dto/delete-product.dto';
import { ProductRepository } from './product.repository';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { UpdateAssessmentsDto } from './dto/update-assesments.dto';
import { DeleteProductCommand } from './commands/delete-product/delete-product.command';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get(':id')
    async getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<GetProductDto> {
        return this.queryBus.execute(new GetProductQuery(id));
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    async create(@Body() dto: CreateProductDto): Promise<CreateProductDto> {
        return this.commandBus.execute(new CreateProductCommand(dto));
    }

    @UseGuards(AccessTokenGuard)
    @Put('')
    async update(@Body() dto: UpdateProductDto): Promise<UpdateProductResponseDto> {
        return this.commandBus.execute(new UpdateProductCommand(dto));
    }

    @Patch(':id/likes')
    async addLike(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.productRepository.addLike(id);
    }

    @Patch(':id/likes/remove')
    async removeLike(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.productRepository.removeLike(id);
    }

    @Patch(':id/dislikes')
    async addDislike(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.productRepository.addDislike(id);
    }

    @Patch(':id/dislikes/remove')
    async removeDislike(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.productRepository.removeDislike(id);
    }

    @UseGuards(AccessTokenGuard)
    @Put('assessments')
    async updateAssessments(@Body() { productUuid, like, dislike }: UpdateAssessmentsDto): Promise<UpdateProductResponseDto> {
        const updatedAssessments = await this.productRepository.updateAssessmentsByProductId(productUuid, like, dislike);

        return { uuid: updatedAssessments.productUuid };
    }

    @UseGuards(AccessTokenGuard)
    @Delete('')
    async deleteProductById(@Body() dto: DeleteProductDto): Promise<DeleteProductResponseDto> {
        return this.commandBus.execute(new DeleteProductCommand(dto.uuid));
    }
}
