import { RoleEnum } from '@common/decorators/roles.decorator';

export class DeleteReviewCommand {
    constructor(
        public readonly reviewUuid: string,
        public readonly role: RoleEnum,
        public readonly userUuid: string,
    ) {}
}
