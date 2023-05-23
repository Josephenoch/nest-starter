import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateBookMarkDTO, UpdateBookMarkDTO } from './dto';

interface CreateDataInterface extends CreateBookMarkDTO {
  userID: string;
}

interface UpdateDataInterface extends UpdateBookMarkDTO {
  id: string;
  userID: string;
}

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(dto: CreateDataInterface) {
    try {
      return await this.prisma.bookMark.create({
        data: { ...dto },
      });
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(
        'Not allowed to perform request on this resource',
      );
    }
  }

  async updateBookmark(dto: UpdateDataInterface) {
    const { id, userID, ...data } = dto;
    try {
      if (await this.checkPermission(userID, id))
        throw new UnauthorizedException(
          'Not allowed to perform request on this resource',
        );
      return await this.prisma.bookMark.update({
        where: {
          id,
        },
        data: { ...data },
      });
    } catch (err) {
      throw new UnauthorizedException(
        'Not allowed to perform request on this resource',
      );
    }
  }

  async deleteBookmark({ id, userID }: { id: string; userID: string }) {
    try {
      if (await this.checkPermission(userID, id))
        throw new UnauthorizedException(
          'Not allowed to perform request on this resource',
        );
      await this.prisma.bookMark.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getBookMarkWithID({ id, userID }: { id: string; userID: string }) {
    try {
      const resp = await this.prisma.bookMark.findFirst({
        where: {
          id,
          userID,
        },
      });
      if (!resp) throw new UnauthorizedException();
      return resp;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getUserBookMarks(userID: string) {
    try {
      return await this.prisma.bookMark.findMany({
        where: {
          userID,
        },
      });
    } catch (err) {
      throw new Error('Unknown error');
    }
  }

  async checkPermission(userID: string, id: string) {
    const bookmark = await this.prisma.bookMark.findUnique({
      where: {
        id,
      },
    });
    if (userID !== bookmark.userID) return true;
  }
}
