import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id!: number;

  @Field()
  text!: string;

  @Field()
  createdAt!: Date;

  @Field(() => Int)
  postId!: number;

  @Field(() => Int, { nullable: true })
  userId?: number | null;

  @Field(() => Post)
  post?: Post;

  @Field(() => User, { nullable: true })
  user?: User | null;
}
