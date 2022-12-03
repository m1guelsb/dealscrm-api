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
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { EditCustomerDto } from './dto/editCustomer.dto';

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

}
