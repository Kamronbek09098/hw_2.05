import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Field(() => Int)
  @IsInt()
  userId!: number;
}
