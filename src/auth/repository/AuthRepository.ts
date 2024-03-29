import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDtoInput, SignupDtoInput } from '../dto';
import { iAuthRepository } from './iauth.repository';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthRepository implements iAuthRepository {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDtoInput): Promise<{ access_token: string }> {
    const isEmailRegistered = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isEmailRegistered)
      throw new ForbiddenException('email already registered');

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hash,
      },
    });

    return this.signToken(user.id, user.email);
  }

  async signin(dto: SigninDtoInput): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('email is incorrect');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('password is incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{
    access_token: string;
  }> {
    const jwtPayload = {
      sub: userId,
      email,
    } as JwtPayload;

    const secret = this.config.get('JWT_SECRET');

    const signedToken = await this.jwt.signAsync(jwtPayload, {
      expiresIn: '1h',
      secret,
    });

    return {
      access_token: signedToken,
    };
  }
}
