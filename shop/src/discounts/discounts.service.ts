import { Injectable } from '@nestjs/common';
import { Discount, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiscountsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DiscountCreateInput): Promise<Discount> {
    return this.prisma.discount.create({ data });
  }

  async discount(
    discountWhereUniqueInput: Prisma.DiscountWhereUniqueInput,
  ): Promise<Discount | null> {
    return this.prisma.discount.findUnique({
      where: discountWhereUniqueInput,
    });
  }

  async discounts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiscountWhereUniqueInput;
    where?: Prisma.DiscountWhereInput;
    orderBy?: Prisma.DiscountOrderByWithRelationInput;
  }): Promise<Discount[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.discount.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<Discount[]> {
    return this.prisma.discount.findMany();
  }

  async update(params: {
    where: Prisma.DiscountWhereUniqueInput;
    data: Prisma.DiscountUpdateInput;
  }): Promise<Discount> {
    const { where, data } = params;
    return this.prisma.discount.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.DiscountWhereUniqueInput): Promise<Discount> {
    return this.prisma.discount.delete({
      where,
    });
  }
}
