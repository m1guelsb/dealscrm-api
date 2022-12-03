import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDtoInput, SignupDtoInput } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto/editUser.dto';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer.dto';
import { EditCustomerDto } from 'src/customer/dto/editCustomer.dto';

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

  const signupDto: SignupDtoInput = {
    email: 'test@test.com',
    name: 'test name',
    password: '123',
  };
  const signinDto: SigninDtoInput = {
    email: 'test@test.com',
    password: '123',
  };

  describe('\x1b[42m-Auth\x1b[0m', () => {
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

    describe('Signin', () => {
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signinDto)
          .expectStatus(200)
          .stores('access_token', 'access_token');
      });

      describe('signin exceptions', () => {
        it('should throw 403 (incorrect email)', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              email: 'wrong@email.com',
              password: signinDto.password,
            })
            .expectStatus(403)
            .expectBodyContains('email is incorrect');
        });
        it('should throw 403 (incorrect password)', () => {
          return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
              email: signinDto.email,
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

  describe('\x1b[42m-User\x1b[0m', () => {
    describe('Find me', () => {
      it('should get user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200)
          .expectBodyContains(signinDto.email);
      });
    });
    describe('Edit me', () => {
      const editUserDto: EditUserDto = {
        email: 'edit@test.com',
        name: 'edited name',
      };

      it('should edit user', () => {
        return pactum
          .spec()
          .patch('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .withBody(editUserDto)
          .expectStatus(200)
          .expectBodyContains(editUserDto.email)
          .expectBodyContains(editUserDto.name);
      });

      describe('edit me exceptions', () => {
        it('should throw 400 (values type error)', () => {
          return pactum
            .spec()
            .patch('/users/me')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .withBody({
              email: 1,
              name: 1,
            })
            .expectStatus(400)
            .expectBodyContains('email must be an email')
            .expectBodyContains('name must be a string');
        });
      });
    });
  });

  describe('\x1b[45m-Customer\x1b[0m', () => {
    const createCustomerDto: CreateCustomerDto = {
      name: 'test customer',
      email: 'customer@test.com',
      phone: '1234567890',
    };

    pactum.handler.addCaptureHandler('customer', (ctx) => {
      return ctx.res.body;
    });
    describe('Create customer', () => {
      it('should create a customer', () => {
        return pactum
          .spec()
          .post('/customers')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .withBody(createCustomerDto)
          .expectStatus(201)
          .stores('customerData', '#customer');
      });

      describe('create customer exceptions', () => {
        it('should throw 400 (empty values error)', () => {
          return pactum
            .spec()
            .post('/customers')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .withBody({
              name: '',
              email: '',
              phone: '',
            })
            .expectStatus(400)
            .expectBodyContains('name should not be empty')
            .expectBodyContains('email should not be empty')
            .expectBodyContains('phone should not be empty');
        });
        it('should throw 400 (values type error)', () => {
          return pactum
            .spec()
            .post('/customers')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .withBody({
              email: 1,
              name: 1,
              phone: 1,
            })
            .expectStatus(400)
            .expectBodyContains('email must be an email')
            .expectBodyContains('name must be a string')
            .expectBodyContains('phone must be a string');
        });
      });
    });

    describe('Find all customers', () => {
      it('should find all customer', () => {
        return pactum
          .spec()
          .get('/customers')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Find one customer by id', () => {
      it('should find one customer', () => {
        return pactum
          .spec()
          .get('/customers/{customerId}')
          .withPathParams('customerId', '$S{customerData.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200)
          .expectBody('$S{customerData}');
      });
      describe('find one customer exceptions', () => {
        it('should throw 301 (access denied)', () => {
          return pactum
            .spec()
            .get('/customers/{customerId}')
            .withPathParams('customerId', 'wrong-id')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .expectStatus(403);
        });
      });
    });

    describe('Edit customer', () => {
      const editCustomerDto: EditCustomerDto = {
        name: 'edited customer',
        email: 'edit@customer.com',
        phone: '1111111111',
      };

      it('should edit one customer', () => {
        return pactum
          .spec()
          .patch('/customers/{customerId}')
          .withPathParams('customerId', '$S{customerData.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .withBody(editCustomerDto)
          .expectStatus(200)
          .expectBodyContains(editCustomerDto.name);
      });

      describe('edit one customer exceptions', () => {
        it('should throw 301 (access denied)', () => {
          return pactum
            .spec()
            .get('/customers/{customerId}')
            .withPathParams('customerId', 'wrong-id')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .expectStatus(403);
        });
      });
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
