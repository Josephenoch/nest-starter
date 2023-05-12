import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInAuthDTO, SignUpAuthDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
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
      delete user.hash;
      return { user };
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
      delete user.hash;
      return {
        user,
      };
    } else {
      throw new ForbiddenException('Invalid email or Password');
    }
  }
}
