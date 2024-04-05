import { CreatePostHandler } from './create-post/create-post.handler';
import { UpdatePostHandler } from './update-post/update-post.handler';
import { DeletePostHandler } from './delete-post/delete-post.handler';
import { PostViewedHandler } from './post-viewed/post-viewed.handler';
import { UpdatePostViewHandler } from './update-post-view/update-post-view.handler';

export const COMMANDS = [CreatePostHandler, UpdatePostHandler, DeletePostHandler, PostViewedHandler, UpdatePostViewHandler];
