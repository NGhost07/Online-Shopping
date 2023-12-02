import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService, JwtService],
})
export class DeliveriesModule {}
