import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { LoginAuthDTO, SignUpAuthDTO } from 'src/auth/dto';
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
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3333');
    await prisma.cleanDB();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Sign up', () => {
      const body: SignUpAuthDTO = {
        email: 'jamesdoe@gmail.com',
        password: '123ewnkno21',
        first_name: 'James',
        last_name: 'Doe',
      };

      test('Should throw exception if email empty', () => {
        const { email, ...rest } = body;
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ ...rest })
          .expectStatus(400);
      });

      test('Should throw exception if password empty', () => {
        const { password, ...rest } = body;
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ ...rest })
          .expectStatus(400);
      });

      test('Should throw exception if first_name empty', () => {
        const { first_name, ...rest } = body;
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ ...rest })
          .expectStatus(400);
      });

      test('Should throw exception if last_name empty', () => {
        const { last_name, ...rest } = body;
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ ...rest })
          .expectStatus(400);
      });

      test('Should Sign Up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            ...body,
          })
          .expectStatus(201);
      });
    });
    describe('Sign in', () => {
      const body: LoginAuthDTO = {
        email: 'jamesdoe@gmail.com',
        password: '123ewnkno21',
      };
      test('Should SignIn', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...body })
          .expectStatus(200);
      });
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
