import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserDecorator } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateBookMarkDTO } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create-new')
  createNewBookMark(@UserDecorator('id') id: string, dto: CreateBookMarkDTO) {
    return this.bookmarkService.createBookmark({ ...dto, userID: id });
  }

  @Get(':id')
  getBookmarkwithID(
    @Param('id') id: string,
    @UserDecorator('id') userID: string,
  ) {
    return this.bookmarkService.getBookMarkWithID({ id, userID });
  }

  @Get('all-bookmark')
  getUserBookMarks(@UserDecorator('id') userID: string) {
    return this.bookmarkService.getUserBookMarks(userID);
  }
}
