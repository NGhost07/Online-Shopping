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
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  async create(
    @Body() createDeliveryDto: CreateDeliveryDto,
  ): Promise<Delivery> {
    const {
      status,
      estimatedDeliveryDate,
      actualDeliveryDate,
      orderId,
      addressId,
    } = createDeliveryDto;
    return this.deliveriesService.create({
      status,
      estimatedDeliveryDate,
      actualDeliveryDate,
      order: {
        connect: { order_id: orderId },
      },
      address: {
        connect: { address_id: addressId },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Delivery | null> {
    return this.deliveriesService.delivery({ delivery_id: id });
  }

  @Get('order-id/:orderId')
  async findManyByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<Delivery[]> {
    return this.deliveriesService.deliveries({
      where: { orderId: orderId },
    });
  }

  @Roles(Role.ADMIN)
  @Get('address-id/:addressId')
  async findManyByAddressId(
    @Param('addressId') addressId: string,
  ): Promise<Delivery[]> {
    return this.deliveriesService.deliveries({
      where: { addressId: addressId },
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const {
      status,
      estimatedDeliveryDate,
      actualDeliveryDate,
      orderId,
      addressId,
    } = updateDeliveryDto;
    return this.deliveriesService.update({
      where: { delivery_id: id },
      data: {
        status,
        estimatedDeliveryDate,
        actualDeliveryDate,
        order: {
          connect: { order_id: orderId },
        },
        address: {
          connect: { address_id: addressId },
        },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Delivery> {
    return this.deliveriesService.delete({ delivery_id: id });
  }
}
