import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty({ message: 'All filed are required!' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'All filed are required!' })
  @IsString()
  tweet: string;
}
