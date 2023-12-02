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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const { message, userId } = createNotificationDto;
    return this.notificationsService.create({
      message,
      user: {
        connect: { user_id: userId },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.notification({ notification_id: id });
  }

  @Get('user-id/:userId')
  async findManyByUserId(
    @Param('userId') userId: string,
  ): Promise<Notification[]> {
    return this.notificationsService.notifications({
      where: { userId: userId },
    });
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const { message, userId } = updateNotificationDto;
    return this.notificationsService.update({
      where: { notification_id: id },
      data: {
        message,
        user: {
          connect: { user_id: userId },
        },
      },
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.delete({ notification_id: id });
  }
}
