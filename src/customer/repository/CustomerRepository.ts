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

  async findOneCustomer(
    userId: string,
    customerId: string,
  ): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: customerId,
        userId,
      },
    });

    if (!customer || customer.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    return customer;
  }

  async editCustomer(
    userId: string,
    customerId: string,
    dto: EditCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer || customer.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    const editedCustomer = await this.prisma.customer.update({
      where: {
        id: customerId,
      },
      data: {
        ...dto,
      },
    });

    return editedCustomer;
  }

  async deleteCustomer(userId: string, customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer || customer.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    await this.prisma.customer.delete({
      where: {
        id: customerId,
      },
    });
  }
}
