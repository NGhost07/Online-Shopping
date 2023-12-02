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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category | null> {
    return this.categoriesService.category({ category_id: id });
  }

  @Get('category/:title')
  async findByTittle(@Param('title') title: string): Promise<Category | null> {
    return this.categoriesService.category({ title: title });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update({
      where: { category_id: id },
      data: updateCategoryDto,
    });
  }

  @Roles(Role.ADMIN)
  @Patch('category/:title')
  async updateByTitle(
    @Param('title') title: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update({
      where: { title: title },
      data: updateCategoryDto,
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.delete({ category_id: id });
  }

  @Roles(Role.ADMIN)
  @Delete('category/:title')
  async deleteByTitle(@Param('title') title: string): Promise<Category> {
    return this.categoriesService.delete({ title: title });
  }
}
