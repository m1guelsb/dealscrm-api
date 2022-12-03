import { Customer } from '@prisma/client';
import { DealEntity } from 'src/deal/entities/deal.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

export interface iCustomerRepository {
  createCustomer: (
    userId: string,
    dto: CreateCustomerDto,
  ) => Promise<CustomerEntity>;

  findAllCustomers: (userId: string) => Promise<CustomerEntity[]>;

  findOneCustomer: (
    userId: string,
    customerId: string,
  ) => Promise<CustomerEntity>;

  editCustomer: (
    userId: string,
    customerId: string,
    dto: UpdateCustomerDto,
  ) => Promise<Customer>;

  findCustomerAllDeals: (customerId: string) => Promise<DealEntity[]>;

  deleteCustomer: (userId: string, customerId: string) => void;
}
