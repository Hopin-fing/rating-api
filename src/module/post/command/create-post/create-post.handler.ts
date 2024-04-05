import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostRepository } from '../../post.repository';
import { PostEntity } from '../../entities/post.entity';
import { AuthorEntity } from '../../../author/entities/author.entity';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(private readonly postRepository: PostRepository) {}

    async execute({ dto, userId }: CreatePostCommand) {
        const { author, ...data } = dto;
        const postEntity = new PostEntity(data);

        const doubleAlias = await this.postRepository.getWithRelationsByAlias(postEntity?.alias);

        if (doubleAlias) {
            throw new BadRequestException(`Пост с таким алиас: "${doubleAlias?.alias}" уже существует`);
        }

        if (author) {
            const authorEntity = new AuthorEntity(author);
            return this.postRepository.createPostWithRelations(postEntity, authorEntity, userId);
        }

        return this.postRepository.create(postEntity, userId);
    }
}
