import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskEntity } from 'src/task/entities/task.entity';
import { CreateDealDto } from '../dto/create-deal.dto';
import { UpdateDealDto } from '../dto/update-deal.dto';
import { DealEntity } from '../entities/deal.entity';
import { iDealRepository } from './i-deal.repository';

@Injectable()
export class DealRepository implements iDealRepository {
  constructor(private prisma: PrismaService) {}

  async createDeal(
    userId: string,
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
        userId,
        customerId,
        ...dto,
      },
    });

    return new DealEntity(newDeal);
  }

  async findAllDeals(userId: string): Promise<DealEntity[]> {
    const dealsList = await this.prisma.deal.findMany({
      where: {
        userId,
      },
    });

    if (!!dealsList.length && dealsList[0].userId !== userId)
      throw new ForbiddenException('access to resource denied');

    return dealsList;
  }

  async findOneDeal(userId: string, dealId: string): Promise<DealEntity> {
    const deal = await this.prisma.deal.findFirst({
      where: {
        id: dealId,
        userId,
      },
    });
    if (!deal)
      throw new NotFoundException('deal with provided id does not exists');

    if (deal && deal.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    return deal;
  }

  async findAllDealTasks(dealId: string): Promise<TaskEntity[]> {
    const deal = await this.prisma.deal.findUnique({
      where: {
        id: dealId,
      },
    });

    if (!deal)
      throw new NotFoundException('deal with the provided id does not exists');

    const dealTasksList = await this.prisma.task.findMany({
      where: {
        dealId,
      },
    });

    return dealTasksList;
  }

  async updateDeal(userId: string, dealId: string, dto: UpdateDealDto) {
    const deal = await this.prisma.deal.findUnique({
      where: {
        id: dealId,
      },
    });

    if (deal.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    const editedDeal = await this.prisma.deal.update({
      where: {
        id: dealId,
      },
      data: {
        ...dto,
      },
    });

    return editedDeal;
  }

  async deleteDeal(userId: string, dealId: string) {
    const deal = await this.prisma.deal.findUnique({
      where: {
        id: dealId,
      },
    });

    if (deal.userId !== userId)
      throw new ForbiddenException('access to resource denied');

    await this.prisma.deal.delete({
      where: {
        id: dealId,
      },
    });
  }
}
