import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'PENDING',
    enum: OrderStatus,
    default: 'PENDING',
    required: false,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
