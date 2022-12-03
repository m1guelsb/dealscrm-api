import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { DealRepository } from './repositories/DealRepository';

@Module({
  controllers: [DealController],
  providers: [DealService, DealRepository],
})
export class DealModule {}
