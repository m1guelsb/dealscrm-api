import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { DealEntity } from '../entities/deal.entity';

export class CreateDealDto implements Partial<DealEntity> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
