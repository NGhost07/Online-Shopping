import { Injectable } from '@nestjs/common';
import { Prisma, ProductMeta } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductMetasService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductMetaCreateInput): Promise<ProductMeta> {
    return this.prisma.productMeta.create({ data });
  }

  async productMeta(
    productMetaWhereUniqueInput: Prisma.ProductMetaWhereUniqueInput,
  ): Promise<ProductMeta | null> {
    return this.prisma.productMeta.findUnique({
      where: productMetaWhereUniqueInput,
    });
  }

  async productMetas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductMetaWhereUniqueInput;
    where?: Prisma.ProductMetaWhereInput;
    orderBy?: Prisma.ProductMetaOrderByWithRelationInput;
  }): Promise<ProductMeta[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productMeta.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<ProductMeta[]> {
    return this.prisma.productMeta.findMany();
  }

  async update(params: {
    where: Prisma.ProductMetaWhereUniqueInput;
    data: Prisma.ProductMetaUpdateInput;
  }): Promise<ProductMeta> {
    const { where, data } = params;
    return this.prisma.productMeta.update({
      data,
      where,
    });
  }

  async delete(
    where: Prisma.ProductMetaWhereUniqueInput,
  ): Promise<ProductMeta> {
    return this.prisma.productMeta.delete({
      where,
    });
  }
}
