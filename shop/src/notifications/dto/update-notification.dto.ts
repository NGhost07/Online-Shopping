import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({ required: false })
  @IsString()
  message?: string;

  @ApiProperty({ required: false })
  @IsString()
  userId?: string;
}
