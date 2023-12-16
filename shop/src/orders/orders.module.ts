import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, JwtService],
})
export class OrdersModule {}
