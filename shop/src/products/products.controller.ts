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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const { title, price, quantity, description, img_url, categoryId } =
      createProductDto;

    return this.productsService.create({
      title,
      price,
      quantity,
      description,
      img_url,
      category: {
        connect: { category_id: categoryId },
      },
    });
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.product({ product_id: id });
  }

  @Get('products/:title')
  async findManyByTitle(@Param('title') title: string): Promise<Product[]> {
    return this.productsService.products({
      where: {
        title: title,
      },
    });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { title, price, quantity, description, img_url, categoryId } =
      updateProductDto;

    return this.productsService.update({
      where: { product_id: id },
      data: {
        title,
        price,
        quantity,
        description,
        img_url,
        category: {
          connect: { category_id: categoryId },
        },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete({ product_id: id });
  }
}
