import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guard/accessToken.guard';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './command/create-post/create-post.command';
import { GetPostByAliasQuery } from './query/get-post-by-alias/get-post-by-alias.query';
import { GetPostDto } from './dto/get-post.dto';
import { GetPostByIdQuery } from './query/get-post-by-id/get-post-by-id.query';
import { FindPostsQuery } from './query/find-posts/find-posts.query';
import { FindPostsRequestDto, FindPostsResponseDto } from './dto/find-posts.dto';
import { UpdatePostDto, UpdatePostResponseDto } from './dto/update-post.dto';
import { UpdatePostCommand } from './command/update-post/update-post.command';
import { DeletePostDto, DeletePostResponseDto } from './dto/delete-post.dto';
import { DeletePostCommand } from './command/delete-post/delete-post.command';
import { PostViewedCommand } from './command/post-viewed/post-viewed.command';
import { UpdatePostViewDto } from './dto/update-post-view.dto';
import { UpdatePostViewCommand } from './command/update-post-view/update-post-view.command';
import { SearchPostsRequestDto, SearchPostsResponseDto } from './dto/search-posts.dto';
import { SearchPostsQuery } from './query/search-posts/search-posts.query';
import { HasRoles, RoleEnum } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import { UserContext } from '../auth/types/user.context.interface';

@Controller('post')
export class PostController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}
    @UseGuards(AccessTokenGuard)
    @HasRoles([RoleEnum.ADMIN])
    @Post('')
    async createPost(@User() user: UserContext, @Body() dto: CreatePostDto): Promise<CreatePostResponseDto> {
        return this.commandBus.execute(new CreatePostCommand(dto, user.userId));
    }

    @UseGuards(AccessTokenGuard)
    @HasRoles([RoleEnum.ADMIN])
    @Put('')
    async updatePost(@User() user: UserContext, @Body() dto: UpdatePostDto): Promise<UpdatePostResponseDto> {
        return this.commandBus.execute(new UpdatePostCommand(dto, user.userId));
    }

    @Patch(':id/views')
    async addView(@Param('id', ParseUUIDPipe) id: string): Promise<UpdatePostResponseDto> {
        return this.commandBus.execute(new PostViewedCommand(id));
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id/update-views')
    async updateView(@Param('id', ParseUUIDPipe) id: string, @Body() { views }: UpdatePostViewDto): Promise<UpdatePostResponseDto> {
        return this.commandBus.execute<UpdatePostViewCommand, UpdatePostResponseDto>(new UpdatePostViewCommand(id, views));
    }

    @HasRoles([RoleEnum.USER, RoleEnum.ADMIN])
    @Get('')
    async findPosts(@Query() dto: FindPostsRequestDto): Promise<FindPostsResponseDto> {
        return this.queryBus.execute(new FindPostsQuery(dto));
    }

    @Get('search')
    async searchPosts(@Query() dto: SearchPostsRequestDto): Promise<SearchPostsResponseDto> {
        return this.queryBus.execute<SearchPostsQuery, SearchPostsResponseDto>(new SearchPostsQuery(dto));
    }

    @Get(':id')
    async getPostById(@Param('id', ParseUUIDPipe) id: string): Promise<GetPostDto> {
        return this.queryBus.execute(new GetPostByIdQuery(id));
    }

    @Get('alias/:alias')
    async getPostByAlias(@Param('alias') alias: string): Promise<GetPostDto> {
        const post = await this.queryBus.execute(new GetPostByAliasQuery(alias));
        if (!post) {
            throw new NotFoundException(`Post ${alias} not found`);
        }
        return post;
    }

    @UseGuards(AccessTokenGuard)
    @Delete('')
    async deletePost(@Body() { uuid }: DeletePostDto): Promise<DeletePostResponseDto> {
        const result = await this.commandBus.execute(new DeletePostCommand(uuid));

        if (!result) {
            throw new InternalServerErrorException(`Post ${uuid} has associated entities and cannot be deleted.`);
        }

        return result;
    }
}
