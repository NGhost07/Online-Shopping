import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateDiscountDto {
  @ApiProperty({ required: false })
  @IsString()
  promo_code?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  discount_amount?: number;

  @ApiProperty({
    example: '2023-01-01T00:00:000.000Z',
    default: Date.now(),
    required: false,
  })
  @IsDate()
  startAt?: Date;

  @ApiProperty({ example: '2023-01-01T00:00:000.000Z', required: false })
  @IsDate()
  expirationAt?: Date;
}
