import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { PostRepository } from '../../post.repository';
import { Post } from '@prisma/client';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand, Pick<Post, 'uuid'>> {
    constructor(private readonly postRepository: PostRepository) {}

    async execute({ id }: DeletePostCommand) {
        return this.postRepository.deleteById(id);
    }
}
