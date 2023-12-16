import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProductMetaDto {
  @ApiProperty({ required: false })
  @IsString()
  key?: string;

  @ApiProperty({ required: false })
  @IsString()
  content?: string;

  @ApiProperty({ required: false })
  @IsString()
  productId?: string;
}
