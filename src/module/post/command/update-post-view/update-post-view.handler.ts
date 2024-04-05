import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostViewCommand } from './update-post-view.command';
import { PostRepository } from '../../post.repository';

@CommandHandler(UpdatePostViewCommand)
export class UpdatePostViewHandler implements ICommandHandler<UpdatePostViewCommand> {
    constructor(private readonly postRepository: PostRepository) {}

    async execute({ id, views }: UpdatePostViewCommand) {
        return this.postRepository.updateViewsByPostId(id, views);
    }
}
