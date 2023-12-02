import { PaymentStatus, PaymentType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsEnum(PaymentType)
  @IsNotEmpty()
  type: PaymentType;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
