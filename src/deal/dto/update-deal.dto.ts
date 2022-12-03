import { IsOptional, IsString } from 'class-validator';
import { CreateDealDto } from './create-deal.dto';

export class UpdateDealDto implements Partial<CreateDealDto> {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  price: number;

  a: string;
}
