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

@ApiTags('Notifications')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Create new Notification' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiCreatedResponse({ description: 'Successfully created Notification' })
  @ApiBadRequestResponse({ description: 'Bad request CreateNotificationDto' })
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

  @ApiOperation({ summary: 'Get all Notifications' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @ApiOperation({ summary: 'Get Notification by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Notification Id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.notification({ notification_id: id });
  }

  @ApiOperation({ summary: 'Get Notification by User id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid User Id' })
  @Get('user-id/:userId')
  async findManyByUserId(
    @Param('userId') userId: string,
  ): Promise<Notification[]> {
    return this.notificationsService.notifications({
      where: { userId: userId },
    });
  }

  @ApiOperation({ summary: 'Update Notification by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Notification Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateNotificationDto' })
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

  @ApiOperation({ summary: 'Delete Notification by Id' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Notification id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.delete({ notification_id: id });
  }
}
