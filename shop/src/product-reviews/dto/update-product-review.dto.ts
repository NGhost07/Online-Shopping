import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductReviewDto {
  @ApiProperty({ required: false })
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  rating?: number;

  @ApiProperty({ required: false })
  @IsString()
  content?: string;

  @ApiProperty({ required: false })
  @IsString()
  userId?: string;

  @ApiProperty({ required: false })
  @IsString()
  parentId?: string;

  @ApiProperty({ required: false })
  @IsString()
  productId?: string;
}
