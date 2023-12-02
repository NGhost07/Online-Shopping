import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsController } from './discounts.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService, JwtService],
})
export class DiscountsModule {}
