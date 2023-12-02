import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, JwtService],
})
export class OrderDetailsModule {}
