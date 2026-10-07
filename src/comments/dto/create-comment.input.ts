import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  text!: string;

  @Field(() => Int)
  @IsInt()
  postId!: number;

  @Field(() => Int, { nullable: true, description: 'Komment muallifi (ixtiyoriy)' })
  @IsOptional()
  @IsInt()
  userId?: number;
}
