import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDTO, SignUpAuthDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
      const user = this.prisma.user.create({
        data: dto,
      });
      return user;
    } catch (err) {
      return 'signed up';
    }
  }

  login(dto: LoginAuthDTO) {
    return 'logged in';
  }
}
