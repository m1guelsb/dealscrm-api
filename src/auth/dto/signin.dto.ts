import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDtoInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
