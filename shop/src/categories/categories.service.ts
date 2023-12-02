import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async category(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  async categories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prisma.category.delete({
      where,
    });
  }
}
