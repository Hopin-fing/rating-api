import { CreateReviewHandler } from './create-review/create-review.handler';
import { DeleteReviewHandler } from './delete-review/delete-review.handler';
import { AddReactionHandler } from './add-reaction/add-reaction.handler';

export const COMMANDS = [CreateReviewHandler, DeleteReviewHandler, AddReactionHandler];
