import { Customer } from '@prisma/client';
import { CreateCustomerDto } from '../dto/createCustomer.dto';
import { EditCustomerDto } from '../dto/editCustomer.dto';

export interface iCustomerRepository {
  createCustomer: (userId: string, dto: CreateCustomerDto) => Promise<Customer>;

  findAllCustomers: (userId: string) => any;

  findOneCustomer: (userId: string, customerId: string) => Promise<Customer>;

  editCustomer: (
    userId: string,
    customerId: string,
    dto: EditCustomerDto,
  ) => Promise<Customer>;

  deleteCustomer: (userId: string, customerId: string) => void;
}
