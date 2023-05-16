import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDTO, SignUpAuthDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
      delete user.password_hash;
      return user;
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
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    const isUser = await argon.verify(user.password_hash, dto.password);
    if (!isUser) throw new UnauthorizedException('Invalid Credentials');
    delete user.password_hash;
    return user;
  }
}
