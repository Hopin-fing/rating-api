import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from './create-category.command';
import { CategoryRepository } from '../../category.repository';
import { CategoryEntity } from '../../entities/category.entity';
import { CreateCategoryResponseDto } from '../../dto/create-category.dto';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute({ dto }: CreateCategoryCommand): Promise<CreateCategoryResponseDto> {
        const categoryEntity = new CategoryEntity(dto);

        const doubleAlias = await this.categoryRepository.getByAlias(categoryEntity?.alias);

        if (doubleAlias) {
            throw new BadRequestException(`Категория с таким алиас: "${doubleAlias?.alias}" уже существует`);
        }

        return this.categoryRepository.create(categoryEntity);
    }
}
