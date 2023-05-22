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
import { UserDecorator } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateBookMarkDTO, UpdateBookMarkDTO } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create-new')
  createNewBookMark(
    @UserDecorator('id') userID: string,
    dto: CreateBookMarkDTO,
  ) {
    return this.bookmarkService.createBookmark({ ...dto, userID });
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

  @Patch(':id')
  updateBookMark(
    @Param('id') id: string,
    @UserDecorator('id') userID: string,
    @Body() body: UpdateBookMarkDTO,
  ) {
    return this.bookmarkService.deleteBookmark({ id, userID, ...body });
  }

  @Delete(':id')
  deleteBookMark(@Param('id') id: string, @UserDecorator('id') userID: string) {
    return this.bookmarkService.deleteBookmark({ id, userID });
  }
}
