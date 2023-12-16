import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  price?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  img_url?: string;

  @ApiProperty({ required: false })
  @IsString()
  categoryId?: string;
}
