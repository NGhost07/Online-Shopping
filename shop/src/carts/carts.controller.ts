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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    const { amount, userId, productId } = createCartDto;
    return this.cartsService.create({
      amount,
      user: {
        connect: { user_id: userId },
      },
      product: {
        connect: { product_id: productId },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Cart | null> {
    return this.cartsService.cart({ cart_id: id });
  }

  @Get('/userId/:userId')
  async findManyByUserId(@Param('userId') userId: string): Promise<Cart[]> {
    return this.cartsService.carts({
      where: { userId: userId },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const { amount, userId, productId } = updateCartDto;
    return this.cartsService.update({
      where: { cart_id: id },
      data: {
        amount,
        user: {
          connect: { user_id: userId },
        },
        product: {
          connect: { product_id: productId },
        },
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.delete({ cart_id: id });
  }
}
