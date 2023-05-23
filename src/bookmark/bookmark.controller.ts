import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserDecorator } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';
import { CreateBookMarkDTO, UpdateBookMarkDTO } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create-new')
  createNewBookMark(
    @UserDecorator('id') userID: string,
    @Body() dto: CreateBookMarkDTO,
  ) {
    return this.bookmarkService.createBookmark({ ...dto, userID });
  }

  @Get(':id')
  async getBookmarkwithID(
    @Param('id') id: string,
    @UserDecorator('id') userID: string,
  ) {
    return this.bookmarkService.getBookMarkWithID({ id, userID });
  }

  @Get('')
  getUserBookMarks(@UserDecorator('id') userID: string) {
    return this.bookmarkService.getUserBookMarks(userID);
  }

  @Patch(':id')
  updateBookMark(
    @Param('id') id: string,
    @UserDecorator('id') userID: string,
    @Body() body: UpdateBookMarkDTO,
  ) {
    return this.bookmarkService.updateBookmark({ id, userID, ...body });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookMark(@Param('id') id: string, @UserDecorator('id') userID: string) {
    return this.bookmarkService.deleteBookmark({ id, userID });
  }
}
