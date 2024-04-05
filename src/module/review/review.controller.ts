import { Controller, Post, Body, Delete, Param, Patch, Get, Query } from '@nestjs/common';
import { CreateReviewDto, CreateReviewResponseDto } from './dto/create-review.dto';
import { HasRoles, RoleEnum } from '@common/decorators/roles.decorator';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReviewCommand } from './commands/create-review/create-review.command';
import { DeleteReviewCommand } from './commands/delete-review/delete-review.command';
import { UserContext } from '../auth/types/user.context.interface';
import { User } from '../auth/user.decorator';
import { ReviewRepository } from './review.repository';
import { AddReactionCommand } from './commands/add-reaction/add-reaction.command';
import { $Enums } from '@prisma/client';
import { GetForAdminQuery } from './query/get-for-admin/get-for-admin.query';
import { GetReviewsForAdminDto, GetReviewsForAdminResponseDto } from './dto/get-reviews-for-admin.dto';
import { GetForUserQuery } from './query/get-for-user/get-for-user.query';
import { GetReviewsForUserDto, GetReviewsForUserResponseDto } from './dto/get-reviews-for-user.dto';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly reviewRepository: ReviewRepository,
    ) {}

    @HasRoles([RoleEnum.ADMIN, RoleEnum.USER])
    @Post()
    async create(@Body() createReviewDto: CreateReviewDto, @User() user: UserContext): Promise<CreateReviewResponseDto> {
        return this.commandBus.execute(new CreateReviewCommand(user.userId, createReviewDto));
    }

    @HasRoles([RoleEnum.ADMIN, RoleEnum.USER])
    @Delete(':id')
    async delete(@Param('id') id: string, @User() user: UserContext) {
        return this.commandBus.execute(new DeleteReviewCommand(id, user.userRole as RoleEnum, user.userId));
    }

    @HasRoles([RoleEnum.USER])
    @Patch(':id/like')
    addLike(@Param('id') id: string) {
        return this.commandBus.execute(new AddReactionCommand(id, 'like'));
    }

    @HasRoles([RoleEnum.USER])
    @Patch(':id/dislike')
    addDislike(@Param('id') id: string) {
        return this.commandBus.execute(new AddReactionCommand(id, 'dislike'));
    }

    @HasRoles([RoleEnum.ADMIN])
    @Patch(':id/approve')
    async approve(@Param('id') id: string) {
        await this.reviewRepository.setStatus(id, $Enums.ReviewStatus.APPROVED);
    }

    @HasRoles([RoleEnum.ADMIN])
    @Patch(':id/reject')
    async reject(@Param('id') id: string) {
        await this.reviewRepository.setStatus(id, $Enums.ReviewStatus.REJECTED);
    }

    @HasRoles([RoleEnum.ADMIN])
    @Get('admin')
    async getForAdmin(@Query() dto: GetReviewsForAdminDto): Promise<GetReviewsForAdminResponseDto> {
        return this.queryBus.execute(new GetForAdminQuery(dto));
    }

    @HasRoles([RoleEnum.USER])
    @Get('user')
    async getReview(@User() user: UserContext, @Query() { limit, offset }: GetReviewsForUserDto): Promise<GetReviewsForUserResponseDto> {
        return this.queryBus.execute(new GetForUserQuery({ userUuid: user.userId, limit, offset }));
    }
}
