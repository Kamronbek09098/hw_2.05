import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') input: CreateCommentInput) {
    return this.commentsService.create(input);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') input: UpdateCommentInput) {
    return this.commentsService.update(input);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
  }

  @ResolveField(() => Post)
  post(@Parent() comment: Comment) {
    return this.prisma.post.findUniqueOrThrow({ where: { id: comment.postId } });
  }

  @ResolveField(() => User, { nullable: true })
  user(@Parent() comment: Comment) {
    if (comment.userId == null) return null;
    return this.prisma.user.findUnique({ where: { id: comment.userId } });
  }
}
