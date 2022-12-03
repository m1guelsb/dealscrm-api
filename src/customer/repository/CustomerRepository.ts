import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from '../dto/createCustomer.dto';
import { EditCustomerDto } from '../dto/editCustomer.dto';
import { CustomerEntity } from '../entity/customer.entity';
import { iCustomerRepository } from './icustomer.repository';

@Injectable()
export class CustomerRepository implements iCustomerRepository {
  constructor(private prisma: PrismaService) {}

  async createCustomer(
    userId: string,
    dto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    const newCustomer = await this.prisma.customer.create({
      data: {
        userId,
        ...dto,
      },
    });

    return new CustomerEntity(newCustomer);
  }

  async findAllCustomers(userId: string): Promise<CustomerEntity[]> {
    const customersList = await this.prisma.customer.findMany({
      where: {
        userId,
      },
    });

    if (customersList && customersList[0].userId !== userId)
      throw new ForbiddenException('access to resource denied');

    return customersList;
  }

}
