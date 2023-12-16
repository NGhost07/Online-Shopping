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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Discounts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @ApiOperation({ summary: 'Create new Discount' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiCreatedResponse({ description: 'Successfully created Discount' })
  @ApiBadRequestResponse({ description: 'Bad request CreateDiscountDto' })
  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    return this.discountsService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Get all Discount' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<Discount[]> {
    return this.discountsService.findAll();
  }

  @ApiOperation({ summary: 'Get Discount by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Discount Id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Discount | null> {
    return this.discountsService.discount({ discount_id: id });
  }

  @ApiOperation({ summary: 'Update Discount by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Discount Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateDiscountDto' })
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

  @ApiOperation({ summary: 'Delete Discount by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Discount id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Discount> {
    return this.discountsService.delete({ discount_id: id });
  }
}
