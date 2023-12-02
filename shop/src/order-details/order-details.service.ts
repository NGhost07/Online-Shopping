import { Injectable } from '@nestjs/common';
import { OrderDetails, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderDetailsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.OrderDetailsCreateInput): Promise<OrderDetails> {
    return this.prisma.orderDetails.create({ data });
  }

  async orderDetail(
    orderDetailsWhereUniqueInput: Prisma.OrderDetailsWhereUniqueInput,
  ): Promise<OrderDetails | null> {
    return this.prisma.orderDetails.findUnique({
      where: orderDetailsWhereUniqueInput,
    });
  }

  async orderDetails(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderDetailsWhereUniqueInput;
    where?: Prisma.OrderDetailsWhereInput;
    orderBy?: Prisma.OrderDetailsOrderByWithRelationInput;
  }): Promise<OrderDetails[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.orderDetails.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<OrderDetails[]> {
    return this.prisma.orderDetails.findMany();
  }

  async update(params: {
    where: Prisma.OrderDetailsWhereUniqueInput;
    data: Prisma.OrderDetailsUpdateInput;
  }): Promise<OrderDetails> {
    const { where, data } = params;
    return this.prisma.orderDetails.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.OrderDetailsWhereUniqueInput,
  ): Promise<OrderDetails> {
    return this.prisma.orderDetails.delete({
      where,
    });
  }
}
