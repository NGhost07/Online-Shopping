import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
