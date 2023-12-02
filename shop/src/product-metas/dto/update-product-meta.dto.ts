import { PartialType } from '@nestjs/mapped-types';
import { CreateProductMetaDto } from './create-product-meta.dto';

export class UpdateProductMetaDto extends PartialType(CreateProductMetaDto) {}
