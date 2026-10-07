import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  fullname!: string;
}
