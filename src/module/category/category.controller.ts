import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, CreateCategoryResponseDto } from './dto/create-category.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './command/create-category/create-category.command';
import { GetCategoryResponseDto } from './dto/get-category.dto';
import { FindCategoriesRequestSchema, FindCategoriesResponseDto } from './dto/find-categories.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { DeleteCategoryCommand } from './command/delete-category/delete-category.command';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { UpdateCategoryDto, UpdateCategoryResponseDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryRepository: CategoryRepository,
        private readonly commandBus: CommandBus,
    ) {}

    @Get('')
    async findAndCount(@Query() { domain }: FindCategoriesRequestSchema): Promise<FindCategoriesResponseDto> {
        const { categories, total } = await this.categoryRepository.findAndCount(domain);

        const categoriesWithPostsCount = categories.map(category => ({
            uuid: category.uuid,
            title: category.title,
            order: category.order,
            alias: category.alias,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            postCount: category._count.posts,
        }));

        return { categories: categoriesWithPostsCount, total };
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<GetCategoryResponseDto> {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new BadRequestException('Категория не найденна');
        }
        return {
            uuid: category.uuid,
            title: category.title,
            order: category.order,
            alias: category.alias,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            postCount: category._count.posts,
        };
    }

    @Get('alias/:alias')
    async getByAlias(@Param('alias') alias: string): Promise<GetCategoryResponseDto> {
        const category = await this.categoryRepository.getByAlias(alias);
        if (!category) {
            throw new BadRequestException('Категория не найденна');
        }
        return {
            uuid: category.uuid,
            title: category.title,
            order: category.order,
            alias: category.alias,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            postCount: category._count.posts,
        };
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    async create(@Body() dto: CreateCategoryDto): Promise<CreateCategoryResponseDto> {
        return this.commandBus.execute(new CreateCategoryCommand(dto));
    }

    @UseGuards(AccessTokenGuard)
    @Put('')
    async updateById(@Body() dto: UpdateCategoryDto): Promise<UpdateCategoryResponseDto> {
        return this.categoryRepository.updateById(dto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete('')
    async deleteById(@Body() { uuid }: DeleteCategoryDto): Promise<CreateCategoryResponseDto> {
        const result = await this.commandBus.execute(new DeleteCategoryCommand(uuid));

        if (!result) {
            throw new InternalServerErrorException(`Category ${uuid} has associated posts and cannot be deleted.`);
        }

        return result;
    }
}
