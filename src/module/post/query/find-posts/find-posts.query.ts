import { FindPostsRequestDto } from '../../dto/find-posts.dto';

export class FindPostsQuery {
    constructor(public readonly filter: FindPostsRequestDto) {}
}
