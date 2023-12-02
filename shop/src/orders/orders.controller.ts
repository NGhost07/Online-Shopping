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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const { status, totalAmount, userId } = createOrderDto;
    return this.ordersService.create({
      status,
      totalAmount,
      user: {
        connect: {
          user_id: userId,
        },
      },
    });
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.order({ order_id: id });
  }

  @Get('orders/:userId')
  async findManyByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.orders({
      where: { userId: userId },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const { status, totalAmount, userId } = updateOrderDto;
    return this.ordersService.update({
      where: { order_id: id },
      data: {
        status,
        totalAmount,
        user: {
          connect: { user_id: userId },
        },
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Order> {
    return this.ordersService.delete({ order_id: id });
  }
}
