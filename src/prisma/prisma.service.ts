import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://josephenoch:@localhost:5432/bookmark_app?schema=public',
        },
      },
    });
  }
}
