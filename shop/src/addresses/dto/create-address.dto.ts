import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressLine: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
