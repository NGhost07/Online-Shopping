import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtService } from '@nestjs/jwt';
import { CartsController } from './carts.controller';

@Module({
  controllers: [CartsController],
  providers: [CartsService, JwtService],
})
export class CartsModule {}
