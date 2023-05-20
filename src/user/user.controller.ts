import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { UserDecorator } from '../auth/decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  me(@UserDecorator() user: Omit<User, 'password_hash'>) {
    return user;
  }

  @Patch('me')
  updateMe(@UserDecorator('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateMe(id, dto);
  }
}
