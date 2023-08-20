import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty({ message: 'The field is required!' })
  @IsString({ message: 'The field is required!' })
  username: string;

  @IsNotEmpty({ message: 'The field is required!' })
  @IsString({ message: 'The field is required!' })
  tweet: string;
}