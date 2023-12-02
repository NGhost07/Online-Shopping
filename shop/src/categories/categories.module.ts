import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService],
})
export class CategoriesModule {}
