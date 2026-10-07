import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class PostsFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  userId?: number;
}
