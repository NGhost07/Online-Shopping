import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
