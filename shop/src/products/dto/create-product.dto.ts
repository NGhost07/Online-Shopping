import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  img_url: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
