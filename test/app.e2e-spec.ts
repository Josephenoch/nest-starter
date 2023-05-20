import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
// import * as pactum from "pactum"
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  //  we create a test app
  // we pass in the validation pipe so auth pipes would work
  // we get prisma and clean the db, ie. clear the data in the db
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.use(new ValidationPipe({ whitelist: true }));
    await app.init();
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Sign up', () => {
      test.todo('Should Sign Up');
    });
    describe('Sign in', () => {
      test.todo('Should Sign In');
    });
  });

  describe('User', () => {
    // queries
    describe('Get me', () => {});

    // mutations
    describe('Edit me', () => {});
  });

  describe('Bookmark', ()=>{

    // queries
    describe('Get bookmark by id', () => {});
    describe('Get bookmarks', () => {});

    // mutations 
    describe('Create bookmark', () => {});
    describe('Delete bookmark', () => {});
    describe('Edit bookmark', () => {});


  });
});

// https://youtu.be/ZsQnAuh3tZU

// This has to be it for me. The perfect S1  finale, the most amazing anime theme song, Kaneki snapping and beating tf out of Jason. I felt so good watching this scene for the first time.
