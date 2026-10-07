import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PostsModule, UsersModule],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}

