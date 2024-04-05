import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from './update-post.command';
import { PostRepository } from '../../post.repository';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
    constructor(private readonly postRepository: PostRepository) {}

    async execute({ dto, userId }: UpdatePostCommand) {
        return this.postRepository.updateById(dto, userId);
    }
}
