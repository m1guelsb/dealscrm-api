import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDtoInput implements Prisma.UserCreateInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
