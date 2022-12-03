import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { DealRepository } from './repositories/DealRepository';

@Injectable()
export class DealService {
  constructor(private dealRepository: DealRepository) {}

  createDeal(customerId: string, dto: CreateDealDto) {
    return this.dealRepository.createDeal(customerId, dto);
  }
}
