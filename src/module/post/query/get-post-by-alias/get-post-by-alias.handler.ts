import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostByAliasQuery } from './get-post-by-alias.query';
import { PostRepository } from '../../post.repository';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(GetPostByAliasQuery)
export class GetPostByAliasHandler implements IQueryHandler<GetPostByAliasQuery> {
    constructor(private readonly postRepository: PostRepository) {}
    async execute({ alias }: GetPostByAliasQuery) {
        const postData = await this.postRepository.getWithRelationsByAlias(alias);

        if (!postData) throw new BadRequestException('Такой пост не найден!');

        if (postData.products?.length > 0) {
            postData.products = postData.products.map(product => {
                product.linkButton = product.linkButton ? Buffer.from(product.linkButton).toString('base64') : null;
                return product;
            });
        }
        const similarPosts = await this.postRepository.getSimilarPosts(postData.category.uuid, postData.createdAt);
        const res = {
            ...postData,
            similarPosts,
        };
        return res;
    }
}
