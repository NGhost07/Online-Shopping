import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CartsController],
  providers: [CartsService, JwtService],
})
export class CartsModule {}
