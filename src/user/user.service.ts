import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/editUser.dto';
import { UserRepostory } from './repository/UserRepository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepostory) {}

  editUser(userId: string, dto: EditUserDto) {
    return this.userRepository.editUser(userId, dto);
  }
}
