import { CreateDealDto } from '../dto/create-deal.dto';
import { DealEntity } from '../entities/deal.entity';

export interface iDealRepository {
  createDeal: (
    userId: string,
    customerId: string,
    dto: CreateDealDto,
  ) => Promise<DealEntity>;

  findAllDeals: (userId: string) => Promise<DealEntity[]>;
}
