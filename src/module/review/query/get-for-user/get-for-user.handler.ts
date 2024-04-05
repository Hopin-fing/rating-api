import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetForUserQuery } from './get-for-user.query';
import { ReviewRepository } from '../../review.repository';
import { GetReviewsForUserResponseDto } from '../../dto/get-reviews-for-user.dto';

@QueryHandler(GetForUserQuery)
export class GetForUserHandler implements IQueryHandler<GetForUserQuery> {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    async execute({ filter }: GetForUserQuery): Promise<GetReviewsForUserResponseDto> {
        const { reviews, total, offset, limit } = await this.reviewRepository.findAndCountWithPost({ ...filter });
        return { reviews, total, offset, limit };
    }
}
