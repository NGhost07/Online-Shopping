import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductMetaDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  content?: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}
