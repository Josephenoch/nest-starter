import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url:
            config.get('ENV') === 'production'
              ? config.get('PROD_DATABASE_URL')
              : config.get('DEV_DATABASE_URL'),
        },
      },
    });
  }
}
