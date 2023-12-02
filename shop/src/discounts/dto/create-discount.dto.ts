import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  promo_code: string;

  @IsNumber()
  @IsNotEmpty()
  discount_amount: number;

  @IsDate()
  startAt: Date;

  @IsDate()
  @IsNotEmpty()
  expirationAt: Date;
}
