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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create new Product' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiCreatedResponse({ description: 'Successfully created product' })
  @ApiBadRequestResponse({ description: 'Bad request CreateProductDto' })
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

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Get product by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Product Id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.product({ product_id: id });
  }

  @ApiOperation({ summary: 'Get products by name of product' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Product Name' })
  @Get('products/:title')
  async findManyByTitle(@Param('title') title: string): Promise<Product[]> {
    return this.productsService.products({
      where: {
        title: title,
      },
    });
  }

  @ApiOperation({ summary: 'Update product by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid product Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateProductDto' })
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

  @ApiOperation({ summary: 'Delete product by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid product id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete({ product_id: id });
  }
}
