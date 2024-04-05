import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReviewRepository } from '../../review.repository';
import { DeleteReviewCommand } from './delete-review.command';
import { RoleEnum } from '@common/decorators/roles.decorator';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler implements ICommandHandler<DeleteReviewCommand> {
    constructor(private readonly reviewRepository: ReviewRepository) {}

    async execute({ role, userUuid, reviewUuid }: DeleteReviewCommand): Promise<void> {
        const review = await this.reviewRepository.getById(reviewUuid);

        if (!review) throw new BadRequestException('Такой рецензии не существует');

        if (role === RoleEnum.USER) {
            if (userUuid !== review.userUuid) {
                throw new BadRequestException('Доступ запрещен');
            }
        }
        await this.reviewRepository.deleteById(reviewUuid);
    }
}
