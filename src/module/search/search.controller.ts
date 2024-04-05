import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto, SearchResponseDto } from './dto/search.dto';
import { SearchRepository } from './search.repository';

@Controller('search')
export class SearchController {
    constructor(private readonly searchRepository: SearchRepository) {}
    @Get('')
    async search(@Query() { search, limit, offset, domain }: SearchDto): Promise<SearchResponseDto> {
        const { posts, total } = await this.searchRepository.search(search, Number(limit), Number(offset), domain);
        const totalPage = Math.ceil(total / limit);
        const page = totalPage + 1 - Math.ceil(total / (limit + offset));
        return {
            posts,
            totalPage,
            page,
        };
    }
}
