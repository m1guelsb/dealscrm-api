import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnprocessableEntityException,
  Headers,
  Get,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';

@UseGuards(JwtGuard)
@Controller('deals')
export class DealController {
  constructor(private dealService: DealService) {}

  @Post()
  createDeal(
    @GetUser('id') userId: string,
    @Headers('customerId') customerId: string,
    @Body() dto: CreateDealDto,
  ) {
    if (!customerId)
      throw new UnprocessableEntityException(
        '{ customerId: string } header is required',
      );
    return this.dealService.createDeal(userId, customerId, dto);
  }

  @Get()
  findAllDeals(@GetUser('id') userId: string) {
    return this.dealService.findAllDeals(userId);
  }
}
