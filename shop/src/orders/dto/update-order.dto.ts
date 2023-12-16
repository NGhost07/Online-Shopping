import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    example: 'PENDING',
    enum: OrderStatus,
    default: 'PENDING',
    required: false,
  })
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiProperty({ required: false })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ required: false })
  @IsString()
  userId: string;
}
