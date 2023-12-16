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

@ApiTags('Order details')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @ApiOperation({ summary: 'Create new Order Details' })
  @ApiCreatedResponse({ description: 'Successfully created Order Detail' })
  @ApiBadRequestResponse({ description: 'Bad request CreateOrderDetailDto' })
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

  @ApiOperation({ summary: 'Get all Orders Details' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<OrderDetails[]> {
    return this.orderDetailsService.findAll();
  }

  @ApiOperation({ summary: 'Get Order Details by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Order Details id' })
  @Get(':id')
  async findByOrderDetailId(
    @Param('id') id: string,
  ): Promise<OrderDetails | null> {
    return this.orderDetailsService.orderDetail({ order_details_id: id });
  }

  @ApiOperation({ summary: 'Get Order Details by Order id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Order id' })
  @Get('order/:orderId')
  async findByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsService.orderDetails({
      where: { orderId: orderId },
    });
  }

  @ApiOperation({ summary: 'Get Order Details by Product id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Product id' })
  @Roles(Role.ADMIN)
  @Get('product/:productId')
  async findByProductId(
    @Param('productId') productId: string,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsService.orderDetails({
      where: { productId: productId },
    });
  }

  @ApiOperation({ summary: 'Update Order Details by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Order Details Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateOrderDetailDto' })
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

  @ApiOperation({ summary: 'Delete Order Details by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Order Details id' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<OrderDetails> {
    return this.orderDetailsService.delete({ order_details_id: id });
  }
}
