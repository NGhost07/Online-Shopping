import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, JwtService],
})
export class AddressesModule {}
