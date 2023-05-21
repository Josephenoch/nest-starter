import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
        data: dto,
      });
    } catch (err) {
      throw new Error('Unknown error');
    }
  }

  async updateBookmark(dto: UpdateDataInterface) {
    const { id, userID, ...data } = dto;
    try {
      return await this.prisma.bookMark.updateMany({
        where: {
          id: id,
          userID,
        },
        data: { ...data },
      });
    } catch (err) {
      throw new Error('Unknown error');
    }
  }

  async deleteBookmark({ id, userID }: { id: string; userID: string }) {
    try {
      return await this.prisma.bookMark.deleteMany({
        where: {
          id,
          userID,
        },
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async getBookMarkWithID({ id, userID }: { id: string; userID: string }) {
    try {
      return await this.prisma.bookMark.findMany({
        where: {
          id,
          userID,
        },
      });
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
}
