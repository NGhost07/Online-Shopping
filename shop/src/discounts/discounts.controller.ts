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
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.create(createDiscountDto);
  }

  @Get()
  async findAll(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Discount | null> {
    return this.discountsService.discount({ discount_id: id });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.update({
      where: { discount_id: id },
      data: updateDiscountDto,
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Discount> {
    return this.discountsService.delete({ discount_id: id });
  }
}
