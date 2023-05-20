import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { UserDecorator } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  me(@UserDecorator() user: Omit<User, 'password_hash'>) {
    return user;
  }
}
