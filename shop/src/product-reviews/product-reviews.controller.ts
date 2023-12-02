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
import { ProductReviewsService } from './product-reviews.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { Prisma, ProductReview, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post()
  async create(
    @Body() createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    const { title, rating, content, userId, parentId, productId } =
      createProductReviewDto;

    let productReview: Prisma.ProductReviewCreateInput;

    if (parentId == undefined) {
      productReview = {
        title,
        rating,
        content,
        user: {
          connect: { user_id: userId },
        },
        product: {
          connect: { product_id: productId },
        },
      };
    } else {
      productReview = {
        title,
        rating,
        content,
        user: {
          connect: { user_id: userId },
        },
        parent: {
          connect: { product_review_id: parentId },
        },
        product: {
          connect: { product_id: productId },
        },
      };
    }

    return this.productReviewsService.create(productReview);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<ProductReview[]> {
    return this.productReviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductReview> {
    return this.productReviewsService.productReview({ product_review_id: id });
  }

  @Roles(Role.ADMIN)
  @Get('user-id/:userId')
  async findManyByUserId(
    @Param('userId') userId: string,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.productReviews({
      where: { userId: userId },
    });
  }

  @Get('parent-id/:parentId')
  async findManyByParentId(
    @Param('parentId') parentId: string,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.productReviews({
      where: { parentId: parentId },
    });
  }

  @Get('product-id/:productId')
  async findManyByProductId(
    @Param('productId') productId: string,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.productReviews({
      where: { productId: productId },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    const { title, rating, content, userId, parentId, productId } =
      updateProductReviewDto;

    let productReview: Prisma.ProductReviewUpdateInput;

    if (parentId == undefined) {
      productReview = {
        title,
        rating,
        content,
        user: {
          connect: { user_id: userId },
        },
        product: {
          connect: { product_id: productId },
        },
      };
    } else {
      productReview = {
        title,
        rating,
        content,
        user: {
          connect: { user_id: userId },
        },
        parent: {
          connect: { product_review_id: parentId },
        },
        product: {
          connect: { product_id: productId },
        },
      };
    }

    return this.productReviewsService.update({
      where: { product_review_id: id },
      data: productReview,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProductReview> {
    return this.productReviewsService.delete({ product_review_id: id });
  }
}
