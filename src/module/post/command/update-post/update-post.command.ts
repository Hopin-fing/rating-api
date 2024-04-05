import { UserContext } from 'src/module/auth/types/user.context.interface';
import { UpdatePostDto } from '../../dto/update-post.dto';

export class UpdatePostCommand {
    constructor(
        public readonly dto: UpdatePostDto,
        public readonly userId: UserContext['userId'],
    ) {}
}
