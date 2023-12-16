import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({ required: false })
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsString()
  addressLine?: string;

  @ApiProperty({ required: false })
  @IsString()
  postal_code?: string;
}
