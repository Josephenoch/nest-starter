import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signUp(dto: AuthDTO) {
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
  }

  signIn() {
    return 'Signed Up';
  }
}
