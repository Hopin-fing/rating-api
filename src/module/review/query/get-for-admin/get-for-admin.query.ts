import { GetReviewsForAdminDto } from '../../dto/get-reviews-for-admin.dto';

export class GetForAdminQuery {
    constructor(public readonly filter: GetReviewsForAdminDto) {}
}
