import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  fullname!: string;

  @Field()
  createdAt!: Date;

  @Field(() => [Post])
  posts?: Post[];
}
