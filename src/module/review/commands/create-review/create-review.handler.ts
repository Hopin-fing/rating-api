import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReviewCommand } from './create-review.command';
import { ReviewRepository } from '../../review.repository';
import { CreateReviewResponseDto } from '../../dto/create-review.dto';
import { ReviewEntity } from '../../entities/review.entity';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    execute({ userUuid, dto }: CreateReviewCommand): Promise<CreateReviewResponseDto> {
        const reviewEntity = new ReviewEntity({ ...dto, userUuid });
        return this.reviewRepository.create(reviewEntity);
    }
}
