import { IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  city?: string;

  @IsString()
  addressLine?: string;

  @IsString()
  postal_code?: string;

  @IsString()
  userId?: string;
}
