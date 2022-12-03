import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  createCustomer(
    @GetUser('id') userId: string,
    @Body() dto: CreateCustomerDto,
  ) {
    return this.customerService.createCustomer(userId, dto);
  }

  @Get()
  findAllCustomers(@GetUser('id') userId: string) {
    return this.customerService.findAllCustomers(userId);
  }

  @Get(':customerId')
  findOneCustomer(
    @GetUser('id') userId: string,
    @Param('customerId') customerId: string,
  ) {
    return this.customerService.findOneCustomer(userId, customerId);
  }

  @Patch(':customerId')
  editCustomer(
    @GetUser('id') userId: string,
    @Param('customerId') customerId: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.editCustomer(userId, customerId, dto);
  }

  @Delete(':customerId')
  deleteCustomer(
    @GetUser('id') userId: string,
    @Param('customerId') customerId: string,
  ) {
    return this.customerService.deleteCustomer(userId, customerId);
  }
}
