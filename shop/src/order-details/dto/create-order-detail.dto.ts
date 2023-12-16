import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDetailDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
