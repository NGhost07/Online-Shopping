import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductMetasService } from './product-metas.service';
import { CreateProductMetaDto } from './dto/create-product-meta.dto';
import { UpdateProductMetaDto } from './dto/update-product-meta.dto';
import { ProductMeta, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product-metas')
export class ProductMetasController {
  constructor(private readonly productMetasService: ProductMetasService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createProductMetaDto: CreateProductMetaDto,
  ): Promise<ProductMeta> {
    const { key, content, productId } = createProductMetaDto;
    return this.productMetasService.create({
      key,
      content,
      product: {
        connect: { product_id: productId },
      },
    });
  }

  @Get()
  async findAll(): Promise<ProductMeta[]> {
    return this.productMetasService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductMeta> {
    return this.productMetasService.productMeta({ product_meta_id: id });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateProductMetaDto: UpdateProductMetaDto,
  ): Promise<ProductMeta> {
    const { key, content, productId } = updateProductMetaDto;
    return this.productMetasService.update({
      where: {
        product_meta_id: id,
      },
      data: {
        key,
        content,
        product: {
          connect: {
            product_id: productId,
          },
        },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<ProductMeta> {
    return this.productMetasService.delete({ product_meta_id: id });
  }
}
