import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    example: 'DELIVERING',
    enum: DeliveryStatus,
    default: 'DELIVERING',
    required: false,
  })
  @IsEnum(DeliveryStatus)
  status?: DeliveryStatus;

  @ApiProperty({ example: '2023-01-01T00:00:000.000Z', required: false })
  @IsDate()
  estimatedDeliveryDate?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:000.000Z', required: false })
  @IsDate()
  actualDeliveryDate?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressId: string;
}
