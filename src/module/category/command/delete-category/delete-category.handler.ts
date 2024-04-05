import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from './delete-category.command';
import { CategoryRepository } from '../../category.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async execute({ id }: DeleteCategoryCommand): Promise<void> {
        const category = await this.categoryRepository.getByIdWithRelations(id);

        if (!category) throw new BadRequestException('Категория не найдена');

        const { posts } = category;

        if (posts.length > 0) {
            throw new BadRequestException('В категории есть посты, удаление невозможно');
        }

        this.categoryRepository.deleteById(id);
    }
}
