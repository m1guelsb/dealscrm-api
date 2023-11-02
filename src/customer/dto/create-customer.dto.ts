import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CustomerEntity } from '../entities/customer.entity';

export class CreateCustomerDto implements Partial<CustomerEntity> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  phone: string;
}
