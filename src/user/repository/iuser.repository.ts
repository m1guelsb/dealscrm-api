import { User } from '@prisma/client';
import { EditUserDto } from '../dto/editUser.dto';

export interface iUserRepository {
  editUser: (userId: string, dto: EditUserDto) => Promise<User>;
}
