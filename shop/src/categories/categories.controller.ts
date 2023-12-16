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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Categories')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create new Category' })
  @ApiCreatedResponse({ description: 'Category successfully created' })
  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category | null> {
    return this.categoriesService.category({ category_id: id });
  }

  @ApiOperation({ summary: 'Get category by title' })
  @ApiOkResponse({ description: 'Ok' })
  @Get('category/:title')
  async findByTittle(@Param('title') title: string): Promise<Category | null> {
    return this.categoriesService.category({ title: title });
  }

  @ApiOperation({ summary: 'Update category by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Id or type of data' })
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

  @ApiOperation({ summary: 'Update category by title' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid title or type of data',
  })
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

  @ApiOperation({ summary: 'Delete category by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.delete({ category_id: id });
  }

  @ApiOperation({ summary: 'Delete category by title' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid title' })
  @Roles(Role.ADMIN)
  @Delete('category/:title')
  async deleteByTitle(@Param('title') title: string): Promise<Category> {
    return this.categoriesService.delete({ title: title });
  }
}
