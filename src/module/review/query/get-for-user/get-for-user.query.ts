import { GetReviewsForUserDto } from '../../dto/get-reviews-for-user.dto';

export class GetForUserQuery {
    constructor(public readonly filter: GetReviewsForUserDto) {}
}
