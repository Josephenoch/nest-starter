import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateMe(id: string, dto: UpdateUserDto) {
    try {
      const resp = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
      delete resp.password_hash;
      return resp;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
