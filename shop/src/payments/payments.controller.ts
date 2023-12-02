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

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

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

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Payment | null> {
    return this.paymentsService.payment({ payment_id: id });
  }

  @Get('order-id/:orderId')
  async findManyByOrderId(
    @Param('orderId') orderId: string,
  ): Promise<Payment[]> {
    return this.paymentsService.payments({
      where: { orderId: orderId },
    });
  }

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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.delete({ payment_id: id });
  }
}
