import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
