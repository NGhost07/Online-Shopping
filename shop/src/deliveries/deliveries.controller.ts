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

@ApiTags('Deliveries')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @ApiOperation({ summary: 'Create new Delivery' })
  @ApiCreatedResponse({ description: 'Successfully created Delivery' })
  @ApiBadRequestResponse({ description: 'Bad request CreateDeliveryDto' })
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

  @ApiOperation({ summary: 'Get all Deliveries' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @ApiOperation({ summary: 'Get Delivery by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Delivery Id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Delivery | null> {
    return this.deliveriesService.delivery({ delivery_id: id });
  }

  @ApiOperation({ summary: 'Get Delivery by Order id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Order Id' })
  @Get('order-id/:orderId')
  async findManyByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<Delivery[]> {
    return this.deliveriesService.deliveries({
      where: { orderId: orderId },
    });
  }

  @ApiOperation({ summary: 'Get Delivery by Address id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Address Id' })
  @Roles(Role.ADMIN)
  @Get('address-id/:addressId')
  async findManyByAddressId(
    @Param('addressId') addressId: string,
  ): Promise<Delivery[]> {
    return this.deliveriesService.deliveries({
      where: { addressId: addressId },
    });
  }

  @ApiOperation({ summary: 'Update Delivery by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Delivery Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateDeliveryDto' })
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

  @ApiOperation({ summary: 'Delete Delivery by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Delivery id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Delivery> {
    return this.deliveriesService.delete({ delivery_id: id });
  }
}
