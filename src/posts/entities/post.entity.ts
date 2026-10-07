import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  createdAt!: Date;

  @Field(() => Int)
  userId!: number;

  @Field(() => User)
  user?: User;

  @Field(() => [Comment])
  comments?: Comment[];
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  items!: Post[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  totalPages!: number;
}
