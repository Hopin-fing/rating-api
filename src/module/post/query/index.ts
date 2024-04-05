import { GetPostByAliasHandler } from './get-post-by-alias/get-post-by-alias.handler';
import { GetPostByIdHandler } from './get-post-by-id/get-post-by-id.handler';
import { FindPostsHandler } from './find-posts/find-posts.handler';
import { SearchPostsHandler } from './search-posts/search-posts.handler';

export const QUERIES = [GetPostByAliasHandler, GetPostByIdHandler, FindPostsHandler, SearchPostsHandler];
