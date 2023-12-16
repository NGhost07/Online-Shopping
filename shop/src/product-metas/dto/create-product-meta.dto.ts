import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductMetaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ required: false })
  @IsString()
  content?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
