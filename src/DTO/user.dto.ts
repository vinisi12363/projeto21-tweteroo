import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'The field is required!' })
  @IsNotEmpty({ message: 'The field is required!' })
  username: string;

  @IsUrl({ require_protocol: true }, { message: 'The filed is required!' })
  @IsNotEmpty({ message: 'The field is required!' })
  avatar: string;
}
