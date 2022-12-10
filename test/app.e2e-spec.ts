import * as pactum from 'pactum';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDtoInput, SignupDtoInput } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto/editUser.dto';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';
import { CreateDealDto } from 'src/deal/dto/create-deal.dto';
import { UpdateDealDto } from 'src/deal/dto/update-deal.dto';

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

  describe('\x1b[42m-Customer\x1b[0m', () => {
    it('should return empty customers array', () => {
      return pactum
        .spec()
        .get('/customers')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' })
        .expectStatus(200)
        .expectBody([]);
    });

    const createCustomerDto: CreateCustomerDto = {
      name: 'test customer',
      email: 'customer@test.com',
      phone: '1234567890',
    };
    const secondCustomer: CreateCustomerDto = {
      name: 'customer',
      email: 'customer@test.com',
      phone: '1234567890',
    };

    pactum.handler.addCaptureHandler('testCustomer', (ctx) => {
      return ctx.res.body;
    });
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
          .stores('testCustomer', '#testCustomer');
      });
      it('should create a second customer', () => {
        return pactum
          .spec()
          .post('/customers')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .withBody(secondCustomer)
          .expectStatus(201)
          .stores('customer', '#customer');
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
          .expectJsonLength(2);
      });
    });

    describe('Find one customer by id', () => {
      it('should find one customer', () => {
        return pactum
          .spec()
          .get('/customers/{customerId}')
          .withPathParams('customerId', '$S{testCustomer.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200)
          .expectBody('$S{testCustomer}');
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
    describe('Find one customer all deals', () => {
      it('should find customer all deals', () => {
        return pactum
          .spec()
          .get('/customers/{customerId}/deals')
          .withPathParams('customerId', '$S{testCustomer.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200)
          .expectBody([]);
      });
      describe('find customer all deals exceptions', () => {
        it('should throw 404 (customer not found)', () => {
          return pactum
            .spec()
            .get('/customers/{customerId}/deals')
            .withPathParams('customerId', 'wrong-id')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .expectStatus(404);
        });
      });
    });

    describe('Edit customer', () => {
      const updateCustomerDto: UpdateCustomerDto = {
        name: 'edited customer',
        email: 'edit@customer.com',
        phone: '1111111111',
      };

      it('should edit one customer', () => {
        return pactum
          .spec()
          .patch('/customers/{customerId}')
          .withPathParams('customerId', '$S{testCustomer.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .withBody(updateCustomerDto)
          .expectStatus(200)
          .expectBodyContains(updateCustomerDto.name);
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
      it('should delete one customer', () => {
        return pactum
          .spec()
          .delete('/customers/{customerId}')
          .withPathParams('customerId', '$S{testCustomer.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200);
      });

      describe('delete one customer exceptions', () => {
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
  });

  describe('\x1b[45m-Deal\x1b[0m', () => {
    it('should return empty deals array', () => {
      return pactum
        .spec()
        .get('/deals')
        .withHeaders({ Authorization: 'Bearer $S{access_token}' })
        .expectStatus(200)
        .expectBody([]);
    });

    pactum.handler.addCaptureHandler('testDeal', (ctx) => {
      return ctx.res.body;
    });
    pactum.handler.addCaptureHandler('deal', (ctx) => {
      return ctx.res.body;
    });

    describe('Create a customer deal', () => {
      const testDealDto: CreateDealDto = {
        title: 'test deal',
        description: 'test description',
        price: 69,
      };
      const dealDto: CreateDealDto = {
        title: 'deal',
        description: 'deal description',
        price: 10,
      };

      it('should create a test customer deal', () => {
        return pactum
          .spec()
          .post('/deals')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
            customerId: '$S{customer.id}',
          })
          .withBody(testDealDto)
          .expectStatus(201)
          .stores('testDeal', '#testDeal');
      });
      it('should create a customer deal', () => {
        return pactum
          .spec()
          .post('/deals')
          .withHeaders({
            Authorization: 'Bearer $S{access_token}',
            customerId: '$S{customer.id}',
          })
          .withBody(dealDto)
          .expectStatus(201)
          .stores('deal', '#deal');
      });

      describe('create deal exceptions', () => {
        it('should throw 400 (empty values error)', () => {
          return pactum
            .spec()
            .post('/deals')
            .withHeaders({
              Authorization: 'Bearer $S{access_token}',
              customerId: '$S{customer.id}',
            })
            .withBody({
              title: '',
              description: '',
              price: undefined,
            })
            .expectStatus(400)
            .expectBodyContains('title should not be empty')
            .expectBodyContains('description should not be empty')
            .expectBodyContains('price should not be empty');
        });

        it('should throw 422 (customer id header not provided)', () => {
          return pactum
            .spec()
            .post('/deals')
            .withHeaders({
              Authorization: 'Bearer $S{access_token}',
            })
            .withBody(testDealDto)
            .expectStatus(422);
        });
      });
    });

    describe('Find all deals', () => {
      it('should find all deals', () => {
        return pactum
          .spec()
          .get('/deals')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200)
          .expectJsonLength(2);
      });
    });

    describe('Find one deal', () => {
      it('should find one deal', () => {
        return pactum
          .spec()
          .get('/deals/{dealId}')
          .withPathParams('dealId', '$S{deal.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200);
      });
      describe('find one customer exceptions', () => {
        it('should throw 404', () => {
          return pactum
            .spec()
            .get('/deals/wrong-id')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .expectStatus(404);
        });
      });
    });

    describe('Update deal', () => {
      const updateDealDto: UpdateDealDto = {
        title: 'edited deal',
        description: 'edit deal description',
        price: 99,
      };

      it('should update one deal', () => {
        return pactum
          .spec()
          .patch('/deals/{dealId}')
          .withPathParams('dealId', '$S{testDeal.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .withBody(updateDealDto)
          .expectStatus(200)
          .expectBodyContains(updateDealDto.title);
      });

      describe('edit one deal exceptions', () => {
        it('should throw 404 (resource not found)', () => {
          return pactum
            .spec()
            .get('/deals/{dealId}')
            .withPathParams('dealId', 'wrong-id')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .expectStatus(404);
        });
      });
    });

    describe('Delete deal', () => {
      it('should delete a deal', () => {
        return pactum
          .spec()
          .delete('/deals/{dealId}')
          .withPathParams('dealId', '$S{testDeal.id}')
          .withHeaders({ Authorization: 'Bearer $S{access_token}' })
          .expectStatus(200);
      });

      describe('delete a deal exceptions', () => {
        it('should throw 404 (resource not found)', () => {
          return pactum
            .spec()
            .get('/deals/{dealId}')
            .withPathParams('dealId', 'wrong-id')
            .withHeaders({ Authorization: 'Bearer $S{access_token}' })
            .expectStatus(404);
        });
      });
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
