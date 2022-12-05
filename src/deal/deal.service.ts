import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { DealRepository } from './repositories/DealRepository';

@Injectable()
export class DealService {
  constructor(private dealRepository: DealRepository) {}

  createDeal(userId: string, customerId: string, dto: CreateDealDto) {
    return this.dealRepository.createDeal(userId, customerId, dto);
  }
}
