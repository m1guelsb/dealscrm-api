import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto/editUser.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  getMe(@GetUser() user: User) {
    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('me')
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('me')
  @HttpCode(204)
  deleteDeal(@GetUser('id') userId: string) {
    return this.userService.delete(userId);
  }
}
