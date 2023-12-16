import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus } from '@prisma/client';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class UpdateDeliveryDto {
  @ApiProperty({
    example: 'DELIVERING',
    enum: DeliveryStatus,
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

  @ApiProperty({ required: false })
  @IsString()
  orderId?: string;

  @ApiProperty({ required: false })
  @IsString()
  addressId?: string;
}
