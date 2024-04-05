import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorCommand } from './delete-author.command';
import { Author } from '@prisma/client';
import { AuthorRepository } from '../../author.repository';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand, Pick<Author, 'uuid'>> {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async execute({ id }: DeleteAuthorCommand): Promise<Pick<Author, 'uuid'>> {
        const author = await this.authorRepository.getByIdWithRelations(id);

        if (!author) {
            throw new BadRequestException(`Такой автор не существует`);
        }

        const { posts, uuid } = author;

        if (posts.length > 0) {
            const postsIds = posts.map(post => post.uuid);
            throw new InternalServerErrorException(`Author ${uuid} has associated posts: ${postsIds} and cannot be deleted.`);
        }

        return this.authorRepository.deleteById(id);
    }
}
