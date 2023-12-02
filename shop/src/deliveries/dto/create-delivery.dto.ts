import { DeliveryStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsEnum(DeliveryStatus)
  status?: DeliveryStatus;

  @IsDate()
  estimatedDeliveryDate?: Date;

  @IsDate()
  actualDeliveryDate?: Date;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  addressId: string;
}
