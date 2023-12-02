import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductReviewDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  parentId?: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
