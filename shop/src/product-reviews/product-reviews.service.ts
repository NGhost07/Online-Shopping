import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, ProductReview } from '@prisma/client';

@Injectable()
export class ProductReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductReviewCreateInput): Promise<ProductReview> {
    return this.prisma.productReview.create({ data });
  }

  async productReview(
    productReviewWhereUniqueInput: Prisma.ProductReviewWhereUniqueInput,
  ): Promise<ProductReview | null> {
    return this.prisma.productReview.findUnique({
      where: productReviewWhereUniqueInput,
    });
  }

  async productReviews(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductReviewWhereUniqueInput;
    where?: Prisma.ProductReviewWhereInput;
    orderBy?: Prisma.ProductReviewOrderByWithRelationInput;
  }): Promise<ProductReview[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productReview.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<ProductReview[]> {
    return this.prisma.productReview.findMany();
  }

  async update(params: {
    where: Prisma.ProductReviewWhereUniqueInput;
    data: Prisma.ProductReviewUpdateInput;
  }): Promise<ProductReview> {
    const { where, data } = params;
    return this.prisma.productReview.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.ProductReviewWhereUniqueInput,
  ): Promise<ProductReview> {
    return this.prisma.productReview.delete({
      where,
    });
  }
}
