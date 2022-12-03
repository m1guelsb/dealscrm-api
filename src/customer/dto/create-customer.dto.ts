import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CustomerEntity } from '../entities/customer.entity';

export class CreateCustomerDto implements Partial<CustomerEntity> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
