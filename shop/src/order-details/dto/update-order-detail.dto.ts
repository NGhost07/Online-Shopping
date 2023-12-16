import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderDetailDto {
  @ApiProperty({ required: false })
  @IsNumber()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  totalPrice?: number;

  @ApiProperty({ required: false })
  @IsString()
  orderId?: string;

  @ApiProperty({ required: false })
  @IsString()
  productId?: string;
}
