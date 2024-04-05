import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByIdQuery } from './get-post-by-id.query';
import { PostRepository } from '../../post.repository';

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdHandler implements IQueryHandler<GetPostByIdQuery> {
    constructor(private readonly postRepository: PostRepository) {}
    execute({ id }: GetPostByIdQuery) {
        return this.postRepository.getById(id);
    }
}
