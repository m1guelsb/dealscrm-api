import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SigninDtoInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
