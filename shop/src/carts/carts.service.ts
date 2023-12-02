import { Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CartCreateInput): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  async cart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
  ): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: cartWhereUniqueInput,
    });
  }

  async carts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CartWhereUniqueInput;
    where?: Prisma.CartWhereInput;
    orderBy?: Prisma.CartOrderByWithRelationInput;
  }): Promise<Cart[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cart.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  async update(params: {
    where: Prisma.CartWhereUniqueInput;
    data: Prisma.CartUpdateInput;
  }): Promise<Cart> {
    const { where, data } = params;
    return this.prisma.cart.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CartWhereUniqueInput): Promise<Cart> {
    return this.prisma.cart.delete({
      where,
    });
  }
}
