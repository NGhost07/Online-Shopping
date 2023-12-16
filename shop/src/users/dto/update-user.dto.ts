import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false })
  @IsString()
  phoneNumber?: string;
}
