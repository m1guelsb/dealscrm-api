import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DealEntity } from '../entities/deal.entity';

export class CreateDealDto implements Partial<DealEntity> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
