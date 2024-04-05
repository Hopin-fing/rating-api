import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReviewRepository } from '../../review.repository';
import { BadRequestException } from '@nestjs/common';
import { ReviewEntity } from '../../entities/review.entity';
import { AddReactionCommand } from './add-reaction.command';

@CommandHandler(AddReactionCommand)
export class AddReactionHandler implements ICommandHandler<AddReactionCommand> {
    constructor(private readonly reviewRepository: ReviewRepository) {}
    async execute({ reviewId, reactionType }: AddReactionCommand) {
        const review = await this.reviewRepository.getById(reviewId);

        if (!review) {
            throw new BadRequestException('Такой рецензии не сущестует');
        }

        const reviewEntity = new ReviewEntity(review);

        if (!reviewEntity.isApproved()) {
            throw new BadRequestException('Нету доступа');
        }

        switch (reactionType) {
            case 'like': {
                await this.reviewRepository.addLike(reviewId);
                break;
            }
            case 'dislike': {
                await this.reviewRepository.addDislike(reviewId);
                break;
            }
        }
    }
}
