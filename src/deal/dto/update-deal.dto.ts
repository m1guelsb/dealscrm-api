import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateDealDto } from './create-deal.dto';

export class UpdateDealDto implements Partial<CreateDealDto> {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description: string;

  @IsIn(['CLOSED', 'IN_PROGRESS'])
  @IsOptional()
  status?: 'CLOSED' | 'IN_PROGRESS';

  @IsNumber()
  @IsOptional()
  price: number;
}
