import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDealDto } from './create-deal.dto';

export class UpdateDealDto implements Partial<CreateDealDto> {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsIn(['CLOSED', 'IN_PROGRESS'])
  @IsOptional()
  status?: 'CLOSED' | 'IN_PROGRESS';

  @IsNumber()
  @IsOptional()
  price: number;
}
