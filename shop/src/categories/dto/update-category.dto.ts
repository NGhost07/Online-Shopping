import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  slug?: string;

  @ApiProperty({ required: false })
  @IsString()
  content?: string;
}
