import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.use(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(() => {
    app.close();
  });
  test.todo('should pass');
});

// https://youtu.be/ZsQnAuh3tZU

// This has to be it for me. The perfect S1  finale, the most amazing anime theme song, Kaneki snapping and beating tf out of Jason. I felt so good watching this scene for the first time.
