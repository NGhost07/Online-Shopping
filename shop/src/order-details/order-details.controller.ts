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
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetails, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  async create(
    @Body() createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetails> {
    const { quantity, totalPrice, orderId, productId } = createOrderDetailDto;
    return this.orderDetailsService.create({
      quantity,
      totalPrice,
      order: {
        connect: { order_id: orderId },
      },
      product: {
        connect: { product_id: productId },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<OrderDetails[]> {
    return this.orderDetailsService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findByOrderDetailId(
    @Param('id') id: string,
  ): Promise<OrderDetails | null> {
    return this.orderDetailsService.orderDetail({ order_details_id: id });
  }

  @Roles(Role.ADMIN)
  @Get('order/:orderId')
  async findByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsService.orderDetails({
      where: { orderId: orderId },
    });
  }

  @Roles(Role.ADMIN)
  @Get('product/:productId')
  async findByProductId(
    @Param('productId') productId: string,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsService.orderDetails({
      where: { productId: productId },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetails> {
    const { quantity, totalPrice, orderId, productId } = updateOrderDetailDto;
    return this.orderDetailsService.update({
      where: { order_details_id: id },
      data: {
        quantity,
        totalPrice,
        order: {
          connect: { order_id: orderId },
        },
        product: {
          connect: { product_id: productId },
        },
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<OrderDetails> {
    return this.orderDetailsService.delete({ order_details_id: id });
  }
}
