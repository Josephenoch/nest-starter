import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { AuthModule } from "./auth/auth.module";
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, BookmarkModule, AuthModule],
})
export class AppModule {}
