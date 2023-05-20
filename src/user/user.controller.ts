import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() req: Request) {
    return this.prisma.user.findUnique({
      where: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        id: req.user,
      },
    });
  }
}
