import { CreateReviewDto } from '../../dto/create-review.dto';

export class CreateReviewCommand {
    constructor(
        public readonly userUuid: string,
        public readonly dto: CreateReviewDto,
    ) {}
}
