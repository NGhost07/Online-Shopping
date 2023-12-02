import { Module } from '@nestjs/common';
import { ProductMetasService } from './product-metas.service';
import { ProductMetasController } from './product-metas.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductMetasController],
  providers: [ProductMetasService, JwtService],
})
export class ProductMetasModule {}
