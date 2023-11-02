import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from '../repository/AuthRepository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(userJwtPayload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userJwtPayload.sub,
      },
    });
    //that function 'return' is injected in every route 'req.body.user' that have @UseGuards(AuthGuard('jwt')) guard
    return user;
  }
}
