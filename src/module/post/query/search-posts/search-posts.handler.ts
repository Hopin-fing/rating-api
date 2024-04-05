import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../post.repository';
import { SearchPostsQuery } from './search-posts.query';

@QueryHandler(SearchPostsQuery)
export class SearchPostsHandler implements IQueryHandler<SearchPostsQuery> {
    constructor(private readonly postRepository: PostRepository) {}
    async execute(command: SearchPostsQuery) {
        const { filter } = command;
        const { posts, total } = await this.postRepository.findAndCountPublic({ ...filter });

        const totalPage = Math.ceil(total / filter.limit);
        const page = totalPage + 1 - Math.ceil(total / (filter.limit + filter.offset));
        return {
            posts,
            totalPage,
            page,
        };
    }
}
