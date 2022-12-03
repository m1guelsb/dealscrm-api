import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnprocessableEntityException,
  Headers,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';

@UseGuards(JwtGuard)
@Controller('deals')
export class DealController {
  constructor(private dealService: DealService) {}

  @Post()
  createDeal(
    @Headers('customerId') customerId: string,
    @Body() dto: CreateDealDto,
  ) {
    if (!customerId)
      throw new UnprocessableEntityException(
        '{ customerId: string } header is required',
      );
    return this.dealService.createDeal(customerId, dto);
  }
}
