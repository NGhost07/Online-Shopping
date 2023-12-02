import { Module } from '@nestjs/common';
import { ProductReviewsService } from './product-reviews.service';
import { ProductReviewsController } from './product-reviews.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService, JwtService],
})
export class ProductReviewsModule {}
