import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoginAuthDTO, SignUpAuthDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SignUpAuthDTO) {
    try {
      const isUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (isUser) return { msg: 'User Already exists' };
      const { password, ...data } = dto;
      const password_hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password_hash,
        },
      });
      return this.signToken({ sub: user.id, email: user.email });
    } catch (err) {
      return 'signed up';
    }
  }

  async login(dto: LoginAuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid Credentials');
    const isUser = await argon.verify(user.password_hash, dto.password);
    if (!isUser) throw new ForbiddenException('Invalid Credentials');
    return this.signToken({ sub: user.id, email: user.email });
  }

  async signToken(payload: { email: string; sub: string }) {
    return {
      acess_token: await this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
