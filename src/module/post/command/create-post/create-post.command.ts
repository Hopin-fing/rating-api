import { UserContext } from 'src/module/auth/types/user.context.interface';
import { CreatePostDto } from '../../dto/create-post.dto';

export class CreatePostCommand {
    constructor(
        public readonly dto: CreatePostDto,
        public readonly userId: UserContext['userId'],
    ) {}
}
