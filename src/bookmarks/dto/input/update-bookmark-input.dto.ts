import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsUrl } from 'class-validator';

@InputType()
export class UpdateBookmarkInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  _id: string;

  @Field(() => [String])
  @IsArray()
  @IsUrl(undefined, {each: true})
  links: string[];
}