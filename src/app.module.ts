import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { BookmarkModule } from './bookmark/bookmark.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '' }),
    UserModule,
    AuthModule,
    PrismaModule,
    BookmarkModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
