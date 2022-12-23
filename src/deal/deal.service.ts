import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealRepository } from './repositories/DealRepository';

@Injectable()
export class DealService {
  constructor(private dealRepository: DealRepository) {}

  createDeal(userId: string, customerId: string, dto: CreateDealDto) {
    return this.dealRepository.createDeal(userId, customerId, dto);
  }

  findAllDeals(userId: string) {
    return this.dealRepository.findAllDeals(userId);
  }

  findOneDeal(userId: string, dealId: string) {
    return this.dealRepository.findOneDeal(userId, dealId);
  }

  findAllDealTasks(dealId: string) {
    return this.dealRepository.findAllDealTasks(dealId);
  }

  updateDeal(userId: string, dealId: string, dto: UpdateDealDto) {
    return this.dealRepository.updateDeal(userId, dealId, dto);
  }

  deleteDeal(userId: string, dealId: string) {
    return this.dealRepository.deleteDeal(userId, dealId);
  }
}
