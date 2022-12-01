import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { DealModule } from './deal/deal.module';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    CustomerModule,
    DealModule,
    TaskModule,
    PrismaModule,
  ],
})
export class AppModule {}
