import { Role } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  password?: string;

  @IsString()
  phoneNumber?: string;

  @IsEnum(Role)
  role?: Role;
}
