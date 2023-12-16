import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { JwtService } from '@nestjs/jwt';
import { AddressesController } from './addresses.controller';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, JwtService],
})
export class AddressesModule {}
