import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './dto/user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  async getMe(@GetUser() user: User) {
    return new UserEntity(user);
  }
}
