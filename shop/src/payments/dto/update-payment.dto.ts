import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentType } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({ example: 'CASH', enum: PaymentType, required: false })
  @IsEnum(PaymentType)
  type?: PaymentType;

  @ApiProperty({ required: false })
  @IsNumber()
  amount?: number;

  @ApiProperty({
    example: 'PENDING',
    enum: PaymentStatus,
    default: 'PENDING',
    required: false,
  })
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty({ required: false })
  @IsString()
  orderId?: string;
}
