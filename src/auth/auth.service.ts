import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInAuthDTO, SignUpAuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SignUpAuthDTO) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials Taken');
      }
      throw error;
    }
  }

  async signIn(dto: SignInAuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid email or Password');
    }
    const isUser = await argon.verify(user.hash, dto.password);
    if (isUser) {
      return this.signToken(user.id, user.email);
    } else {
      throw new ForbiddenException('Invalid email or Password');
    }
  }

  async signToken(userID: string, email: string) {
    const payload = {
      sub: userID,
      email,
    };
    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
