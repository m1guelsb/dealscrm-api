import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDtoInput, SignupDtoInput } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body() dto: SignupDtoInput) {
    return this.authService.signup(dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninDtoInput) {
    return this.authService.signin(dto);
  }
}
