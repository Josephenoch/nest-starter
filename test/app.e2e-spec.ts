import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { LoginAuthDTO, SignUpAuthDTO } from 'src/auth/dto';
import { UpdateUserDto } from 'src/user/dto';
import { CreateBookMarkDTO } from 'src/bookmark/dto';
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

      test('Should throw exception if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
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

      test('Should throw exception if email empty', () => {
        const { email, ...rest } = body;
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...rest })
          .expectStatus(400);
      });

      test('Should throw exception if password empty', () => {
        const { password, ...rest } = body;
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...rest })
          .expectStatus(400);
      });

      test('Should throw exception if no body', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });

      test('Should SignIn', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({ ...body })
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    // queries
    describe('Get me', () => {
      test('Should get current user', () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
      test('Should throw error without Bearer', () => {
        return pactum.spec().get('/user/me').expectStatus(401);
      });
    });

    // mutations
    describe('Edit me', () => {
      const body: UpdateUserDto = {
        first_name: 'James',
        last_name: 'Done',
      };
      test('Should update current user', () => {
        return pactum
          .spec()
          .patch('/user/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({ ...body })
          .expectStatus(200)
          .expectBodyContains(body.last_name)
          .expectBodyContains(body.first_name);
      });

      test('Should throw error with Bearer', () => {
        return pactum
          .spec()
          .patch('/user/me')
          .withBody({ ...body })
          .expectStatus(401);
      });
    });
  });
  const dto: CreateBookMarkDTO = {
    name: 'New Content',
    link: 'https://seanconnolly.dev/unit-testing-nextjs-api-routes',
  };
  describe('Bookmark', () => {
    // queries
    describe('Get empty user bookmarks', () => {
      test('Should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
    describe('Create bookmark', () => {
      test('Should create bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks/create-new')
          .withBody({ ...dto })
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(201)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.link)
          .stores('bookmarkID', 'id');
      });
    });

    describe('Get bookmark by id', () => {
      test('Should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/$S{bookmarkID}')
          .withPathParams({ id: '$S{bookmarkID}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.link);
      });

      test('Should throw unauthorized error with wrong id', () => {
        return pactum
          .spec()
          .get('/bookmarks/2')
          .withPathParams({ id: '$S{bookmarkID}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(401);
      });

      test('Should throw unauthorized error without bearer token', () => {
        return pactum
          .spec()
          .get('/bookmarks/$S{bookmarkID}')
          .withPathParams({ id: '$S{bookmarkID}' })
          .expectStatus(401);
      });
    });
    describe('Get user bookmarks', () => {
      test('Should get all user bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectJsonLength(1);
      });

      test('Should throw unauthorized error without bearer token', () => {
        return pactum.spec().get('/bookmarks/').expectStatus(401);
      });
    });

    // mutations

    describe('Edit bookmark', () => {
      test('Should edit bookmark with id', () => {
        return pactum
          .spec()
          .patch('/bookmarks/$S{bookmarkID}')
          .withBody({ description: 'Test' })
          .withPathParams({ id: '$S{bookmarkID}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBodyContains(dto.link)
          .expectBodyContains(dto.name)
          .expectBodyContains('Test');
      });

      test('Should throw unauthorized error with wrong id', () => {
        return pactum
          .spec()
          .patch('/bookmarks/2')
          .withBody({ description: 'Test' })
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(401);
      });

      test('Should throw unauthorized error without bearer token', () => {
        return pactum
          .spec()
          .patch('/bookmarks/$S{bookmarkID}')
          .withBody({ description: 'Test' })
          .withPathParams({ id: '$S{bookmarkID}' })
          .expectStatus(401);
      });
    });

    describe('Delete bookmark', () => {
      test('Should delete bookmark with id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/$S{bookmarkID}')
          .withPathParams({ id: '$S{bookmarkID}' })
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(204);
      });

      test('Should throw unauthorized error with wrong id', () => {
        return pactum
          .spec()
          .delete('/bookmarks/2}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(401);
      });

      test('Should throw unauthorized error without bearer token', () => {
        return pactum
          .spec()
          .delete('/bookmarks/$S{bookmarkID}')
          .withPathParams({ id: '$S{bookmarkID}' })
          .expectStatus(401);
      });
    });

    test('Should give empty array for user bookmarks', () => {
      return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectJsonLength(0)
        .expectStatus(200);
    });
  });
});

// https://youtu.be/ZsQnAuh3tZU

// This has to be it for me. The perfect S1  finale, the most amazing anime theme song, Kaneki snapping and beating tf out of Jason. I felt so good watching this scene for the first time.
