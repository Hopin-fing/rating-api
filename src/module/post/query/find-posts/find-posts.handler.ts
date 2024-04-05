import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostsQuery } from './find-posts.query';
import { PostRepository } from '../../post.repository';

@QueryHandler(FindPostsQuery)
export class FindPostsHandler implements IQueryHandler<FindPostsQuery> {
    constructor(private readonly postRepository: PostRepository) {}
    async execute(command: FindPostsQuery) {
        const { filter } = command;
        const { posts, total } = await this.postRepository.findAndCountAdmin({ ...filter });

        const totalPage = Math.ceil(total / filter.limit);
        const page = Math.floor(command.filter.offset / command.filter.limit) + 1;
        return {
            posts,
            totalPage,
            page,
        };
    }
}
