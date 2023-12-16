import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ default: 0, required: false })
  @IsNumber()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  img_url?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
