import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { EditCustomerDto } from './dto/editCustomer.dto';
import { CustomerRepository } from './repository/CustomerRepository';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  createCustomer(userId: string, dto: CreateCustomerDto) {
    return this.customerRepository.createCustomer(userId, dto);
  }

  findAllCustomers(userId: string) {
    return this.customerRepository.findAllCustomers(userId);
  }

  findOneCustomer(userId: string, customerId: string) {
    return this.customerRepository.findOneCustomer(userId, customerId);
  }

  editCustomer(userId: string, customerId: string, dto: EditCustomerDto) {
    return this.customerRepository.editCustomer(userId, customerId, dto);
  }

  deleteCustomer(userId: string, customerId: string) {
    return this.customerRepository.deleteCustomer(userId, customerId);
  }
}
