import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from '../dto/editUser.dto';
import { UserEntity } from '../entity/user.entity';
import { iUserRepository } from './iuser.repository';
import * as argon from 'argon2';

@Injectable()
export class UserRepostory implements iUserRepository {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    if (dto?.email) {
      const registeredUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (registeredUser?.email === dto?.email)
        throw new BadRequestException('email already registered');
    }

    let hash: string;
    if (dto.password) hash = await argon.hash(dto.password);

    const editedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: dto.name,
        email: dto.email,
        password: hash,
      },
    });

    return new UserEntity(editedUser);
  }

  async delete(userId: string) {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
