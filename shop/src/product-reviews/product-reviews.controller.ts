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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Product Reviews')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @ApiOperation({ summary: 'Create new ProductReview' })
  @ApiCreatedResponse({ description: 'Successfully created ProductReview' })
  @ApiBadRequestResponse({ description: 'Bad request CreateProductReviewDto' })
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

  @ApiOperation({ summary: 'Get all ProductReviews' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<ProductReview[]> {
    return this.productReviewsService.findAll();
  }

  @ApiOperation({ summary: 'Get ProductReviews by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid ProductReviews Id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductReview> {
    return this.productReviewsService.productReview({ product_review_id: id });
  }

  @ApiOperation({ summary: 'Get ProductReviews by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user Id' })
  @Roles(Role.ADMIN)
  @Get('user-id/:userId')
  async findManyByUserId(
    @Param('userId') userId: string,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.productReviews({
      where: { userId: userId },
    });
  }

  @ApiOperation({ summary: 'Get ProductReviews by parent id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid parent Id' })
  @Get('parent-id/:parentId')
  async findManyByParentId(
    @Param('parentId') parentId: string,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.productReviews({
      where: { parentId: parentId },
    });
  }

  @ApiOperation({ summary: 'Get ProductReviews by product id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid product Id' })
  @Get('product-id/:productId')
  async findManyByProductId(
    @Param('productId') productId: string,
  ): Promise<ProductReview[]> {
    return this.productReviewsService.productReviews({
      where: { productId: productId },
    });
  }

  @ApiOperation({ summary: 'Update ProductReviews Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid ProductReviews Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateProductReviewDto' })
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

  @ApiOperation({ summary: 'Delete ProductReviews by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid ProductReviews id' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProductReview> {
    return this.productReviewsService.delete({ product_review_id: id });
  }
}
