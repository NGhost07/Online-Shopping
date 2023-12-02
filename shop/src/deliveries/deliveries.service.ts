import { Injectable } from '@nestjs/common';
import { Delivery, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DeliveryCreateInput): Promise<Delivery> {
    return this.prisma.delivery.create({ data });
  }

  async delivery(
    deliveryWhereUniqueInput: Prisma.DeliveryWhereUniqueInput,
  ): Promise<Delivery | null> {
    return this.prisma.delivery.findUnique({
      where: deliveryWhereUniqueInput,
    });
  }

  async deliveries(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DeliveryWhereUniqueInput;
    where?: Prisma.DeliveryWhereInput;
    orderBy?: Prisma.DeliveryOrderByWithRelationInput;
  }): Promise<Delivery[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.delivery.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<Delivery[]> {
    return this.prisma.delivery.findMany();
  }

  async update(params: {
    where: Prisma.DeliveryWhereUniqueInput;
    data: Prisma.DeliveryUpdateInput;
  }): Promise<Delivery> {
    const { where, data } = params;
    return this.prisma.delivery.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.DeliveryWhereUniqueInput): Promise<Delivery> {
    return this.prisma.delivery.delete({
      where,
    });
  }
}
