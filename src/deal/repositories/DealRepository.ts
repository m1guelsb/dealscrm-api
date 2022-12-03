import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDealDto } from '../dto/create-deal.dto';
import { DealEntity } from '../entities/deal.entity';
import { iDealRepository } from './i-deal.repository';

@Injectable()
export class DealRepository implements iDealRepository {
  constructor(private prisma: PrismaService) {}

  async createDeal(
    customerId: string,
    dto: CreateDealDto,
  ): Promise<DealEntity> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer)
      throw new NotFoundException(
        'customer with the provided id does not exists',
      );

    const newDeal = await this.prisma.deal.create({
      data: {
        customerId,
        ...dto,
      },
    });

    return new DealEntity(newDeal);
  }
}
