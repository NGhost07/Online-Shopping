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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create new Order' })
  @ApiCreatedResponse({ description: 'Successfully created Order' })
  @ApiBadRequestResponse({ description: 'Bad request CreateOrderDto' })
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

  @ApiOperation({ summary: 'Get all Orders' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Get Order by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid order id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.ordersService.order({ order_id: id });
  }

  @ApiOperation({ summary: 'Get Order by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @Get('orders/:userId')
  async findManyByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.orders({
      where: { userId: userId },
    });
  }

  @ApiOperation({ summary: 'Update Order by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Order Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateOrderDto' })
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

  @ApiOperation({ summary: 'Delete Order by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid order id' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Order> {
    return this.ordersService.delete({ order_id: id });
  }
}
