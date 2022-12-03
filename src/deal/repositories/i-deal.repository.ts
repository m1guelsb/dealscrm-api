import { CreateDealDto } from '../dto/create-deal.dto';
import { DealEntity } from '../entities/deal.entity';

export interface iDealRepository {
  createDeal: (customerId: string, dto: CreateDealDto) => Promise<DealEntity>;
}
