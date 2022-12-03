import { Customer } from '@prisma/client';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

export interface iCustomerRepository {
  createCustomer: (userId: string, dto: CreateCustomerDto) => Promise<Customer>;

  findAllCustomers: (userId: string) => any;

  findOneCustomer: (userId: string, customerId: string) => Promise<Customer>;

  editCustomer: (
    userId: string,
    customerId: string,
    dto: UpdateCustomerDto,
  ) => Promise<Customer>;

  deleteCustomer: (userId: string, customerId: string) => void;
}
