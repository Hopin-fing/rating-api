import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetForAdminQuery } from './get-for-admin.query';
import { GetReviewsForAdminResponseDto } from '../../dto/get-reviews-for-admin.dto';
import { ReviewRepository } from '../../review.repository';

@QueryHandler(GetForAdminQuery)
export class GetForAdminHandler implements IQueryHandler<GetForAdminQuery> {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    async execute({ filter }: GetForAdminQuery): Promise<GetReviewsForAdminResponseDto> {
        return this.reviewRepository.findAndCountWithProduct({
            ...filter,
        });
    }
}
