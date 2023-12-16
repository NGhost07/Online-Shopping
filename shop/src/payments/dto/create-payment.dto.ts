import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'CASH', enum: PaymentType })
  @IsEnum(PaymentType)
  @IsNotEmpty()
  type: PaymentType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'PENDING',
    enum: PaymentStatus,
    default: 'PENDING',
    required: false,
  })
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
