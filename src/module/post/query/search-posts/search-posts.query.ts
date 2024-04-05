import { SearchPostsRequestDto } from '../../dto/search-posts.dto';

export class SearchPostsQuery {
    constructor(public readonly filter: SearchPostsRequestDto) {}
}
