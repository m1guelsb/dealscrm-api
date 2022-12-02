import { Module } from '@nestjs/common';
import { UserRepostory } from './repository/UserRepository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepostory],
})
export class UserModule {}
