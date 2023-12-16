import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    example: 'USER',
    enum: Role,
    default: 'USER',
    required: false,
  })
  @IsEnum(Role)
  role?: Role;
}
