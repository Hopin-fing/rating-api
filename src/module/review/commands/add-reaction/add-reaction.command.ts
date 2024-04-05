export class AddReactionCommand {
    constructor(
        public readonly reviewId: string,
        public readonly reactionType: 'like' | 'dislike',
    ) {}
}
