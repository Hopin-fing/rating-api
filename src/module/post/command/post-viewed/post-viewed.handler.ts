import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostViewedCommand } from './post-viewed.command';
import { PostRepository } from '../../post.repository';
import { UpdatePostResponseDto } from '../../dto/update-post.dto';

@CommandHandler(PostViewedCommand)
export class PostViewedHandler implements ICommandHandler<PostViewedCommand> {
    constructor(private readonly postRepository: PostRepository) {}

    async execute({ id }: PostViewedCommand): Promise<UpdatePostResponseDto> {
        const { uuid } = await this.postRepository.addView(id);

        return { uuid };
    }
}
