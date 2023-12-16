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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
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

@ApiTags('Payments')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Create new Payment' })
  @ApiCreatedResponse({ description: 'Successfully created Payment' })
  @ApiBadRequestResponse({ description: 'Bad request CreatePaymentDto' })
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { type, amount, status, orderId } = createPaymentDto;
    return this.paymentsService.create({
      type,
      amount,
      status,
      order: {
        connect: { order_id: orderId },
      },
    });
  }

  @ApiOperation({ summary: 'Get all Payments' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @ApiOperation({ summary: 'Get Payment by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Payment Id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.payment({ payment_id: id });
  }

  @ApiOperation({ summary: 'Get Payments by Order id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Order Id' })
  @Get('order-id/:orderId')
  async findManyByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<Payment[]> {
    return this.paymentsService.payments({
      where: { orderId: orderId },
    });
  }

  @ApiOperation({ summary: 'Update Payment by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Payment Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdatePaymentDto' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const { type, amount, status, orderId } = updatePaymentDto;
    return this.paymentsService.update({
      where: { payment_id: id },
      data: {
        type,
        amount,
        status,
        order: {
          connect: { order_id: orderId },
        },
      },
    });
  }

  @ApiOperation({ summary: 'Delete Payment by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Payment id' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.delete({ payment_id: id });
  }
}
