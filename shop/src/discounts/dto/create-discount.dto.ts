import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  promo_code: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount_amount: number;

  @ApiProperty({
    example: '2023-01-01T00:00:000.000Z',
    default: Date.now(),
    required: false,
  })
  @IsDate()
  startAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:000.000Z' })
  @IsDate()
  @IsNotEmpty()
  expirationAt: Date;
}
