import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignupDtoInput implements Prisma.UserCreateInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
