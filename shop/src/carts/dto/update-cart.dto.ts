import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ required: false })
  @IsNumber()
  amount?: number;

  @ApiProperty({ required: false })
  @IsString()
  userId?: string;

  @ApiProperty({ required: false })
  @IsString()
  productId?: string;
}
