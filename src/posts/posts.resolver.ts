import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostsFilterInput } from './dto/posts-filter.input';
import { PaginationInput } from '../common/pagination.input';
import { PaginatedPosts, Post } from './entities/post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../users/entities/user.entity';
import { Comment } from '../comments/entities/comment.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') input: CreatePostInput) {
    return this.postsService.create(input);
  }

  @Query(() => PaginatedPosts, { name: 'posts' })
  findAll(
    @Args('filter', { nullable: true }) filter?: PostsFilterInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.postsService.findAll(filter, pagination);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') input: UpdatePostInput) {
    return this.postsService.update(input);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return this.prisma.user.findUniqueOrThrow({ where: { id: post.userId } });
  }

  @ResolveField(() => [Comment])
  comments(@Parent() post: Post) {
    return this.prisma.comment.findMany({ where: { postId: post.id }, orderBy: { id: 'asc' } });
  }
}
