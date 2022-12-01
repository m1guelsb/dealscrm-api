import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDtoInput, SignupDtoInput } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('\x1b[44m-Auth\x1b[0m', () => {
    const signupDto: SignupDtoInput = {
      email: 'test@test.com',
      name: 'test name',
      password: '123',
    };
    describe('Signup', () => {
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signupDto)
          .expectStatus(201);
      });

      describe('signup exceptions', () => {
        it('should throw 403 (email already registred)', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody(signupDto)
            .expectStatus(403)
            .expectBodyContains('email already registred');
        });

        it('should throw 400 (should not be empty)', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              name: '',
              email: '',
              password: '',
            })
            .expectStatus(400)
            .expectBodyContains('email should not be empty')
            .expectBodyContains('name should not be empty')
            .expectBodyContains('password should not be empty');
        });

        it('should throw 400 (values type error)', () => {
          return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
              name: 1,
              email: 1,
              password: 1,
            })
            .expectStatus(400)
            .expectBodyContains('email must be an email')
            .expectBodyContains('name must be a string')
            .expectBodyContains('password must be a string');
        });
      });
    });

    const signinDto: SigninDtoInput = {
      email: 'test@test.com',
      password: '123',
    };
    describe('Signin', () => {
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signinDto)
          .expectStatus(200);
      });

      describe('signin exceptions', () => {
        it('should throw 403 (incorrect email)', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              email: 'wrong@email.com',
              password: '123',
            })
            .expectStatus(403)
            .expectBodyContains('email is incorrect');
        });
        it('should throw 403 (incorrect password)', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              email: 'test@test.com',
              password: 'wrongpassword',
            })
            .expectStatus(403)
            .expectBodyContains('password is incorrect');
        });

        it('should throw 400 (should not be empty)', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              name: '',
              password: '',
            })
            .expectStatus(400)
            .expectBodyContains('email should not be empty')
            .expectBodyContains('password should not be empty');
        });

        it('should throw 400 (values type error)', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              email: 1,
              password: 1,
            })
            .expectStatus(400)
            .expectBodyContains('email must be an email')
            .expectBodyContains('password must be a string');
        });
      });
    });
  });

  describe('\x1b[45m-User\x1b[0m', () => {
    describe('Get me', () => {
      it.todo('should get user');
    });
    describe('Patch me', () => {
      it.todo('should edit user');
    });
  });

  describe('\x1b[45m-Customer\x1b[0m', () => {
    describe('Post customer', () => {
      it.todo('should create a customer');
    });

    describe('Get customers', () => {
      it.todo('should list many customers');
    });

    describe('Get customer by id', () => {
      it.todo('should get one customer');
    });

    describe('Patch customer', () => {
      it.todo('should edit a customer');
    });

    describe('Delete customer', () => {
      it.todo('should delete a customer');
    });
  });

  describe('\x1b[45m-Deal\x1b[0m', () => {
    describe('Post deal', () => {
      it.todo('should create a deal');
    });

    describe('Get deals', () => {
      it.todo('should list many deals');
    });

    describe('Get deal by id', () => {
      it.todo('should get one deal');
    });

    describe('Patch deal', () => {
      it.todo('should edit a deal');
    });

    describe('Delete deal', () => {
      it.todo('should delete a deal');
    });
  });

  describe('\x1b[45m-Task\x1b[0m', () => {
    describe('Post task', () => {
      it.todo('should create a task');
    });

    describe('Get tasks', () => {
      it.todo('should list many tasks');
    });

    describe('Get task by id', () => {
      it.todo('should get one task');
    });

    describe('Patch task', () => {
      it.todo('should edit a task');
    });

    describe('Delete task', () => {
      it.todo('should delete a task');
    });
  });
});
