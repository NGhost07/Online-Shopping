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

@ApiTags('Product Metas')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product-metas')
export class ProductMetasController {
  constructor(private readonly productMetasService: ProductMetasService) {}

  @ApiOperation({ summary: 'Create new Product Meta' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiCreatedResponse({ description: 'Successfully created product meta' })
  @ApiBadRequestResponse({ description: 'Bad request CreateProductMetaDto' })
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

  @ApiOperation({ summary: 'Get all products meta' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<ProductMeta[]> {
    return this.productMetasService.findAll();
  }

  @ApiOperation({ summary: 'Get product meta by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Product Meta Id' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProductMeta> {
    return this.productMetasService.productMeta({ product_meta_id: id });
  }

  @ApiOperation({ summary: 'Update product meta by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid product meta Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateProductDto' })
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

  @ApiOperation({ summary: 'Delete product meta by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid product meta id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<ProductMeta> {
    return this.productMetasService.delete({ product_meta_id: id });
  }
}
