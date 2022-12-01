import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { DealModule } from './deal/deal.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthModule, UserModule, CustomerModule, DealModule, TaskModule],
})
export class AppModule {}
