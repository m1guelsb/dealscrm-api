import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from '../dto/editUser.dto';
import { UserEntity } from '../entity/user.entity';
import { iUserRepository } from './iuser.repository';

@Injectable()
export class UserRepostory implements iUserRepository {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const editedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    return new UserEntity(editedUser);
  }
}
