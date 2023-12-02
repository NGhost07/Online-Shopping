import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
