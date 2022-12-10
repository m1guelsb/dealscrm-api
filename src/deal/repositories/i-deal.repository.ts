import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';
import { DealEntity } from '../entities/deal.entity';

export interface iDealRepository {
  createDeal: (
    userId: string,
    customerId: string,
    dto: CreateDealDto,
  ) => Promise<DealEntity>;

  findAllDeals: (userId: string) => Promise<DealEntity[]>;

  findOneDeal: (userId: string, dealId: string) => Promise<DealEntity>;

  updateDeal: (
    userId: string,
    dealId: string,
    dto: UpdateDealDto,
  ) => Promise<DealEntity>;

  deleteDeal: (userId: string, dealId: string) => void;
}
