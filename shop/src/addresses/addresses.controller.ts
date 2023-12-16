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
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Address')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @ApiOperation({ summary: 'Create new address' })
  @ApiCreatedResponse({ description: 'Address successfully created' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid user id or type of parameter',
  })
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    const { city, addressLine, postal_code, userId } = createAddressDto;

    return this.addressesService.create({
      city,
      addressLine,
      postal_code,
      user: {
        connect: { user_id: userId },
      },
    });
  }

  @ApiOperation({ summary: 'Find all address' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressesService.findAll();
  }

  @ApiOperation({ summary: 'Find address by address id' })
  @ApiOkResponse({ description: 'Ok' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Address | null> {
    return this.addressesService.address({ address_id: id });
  }

  @ApiOperation({ summary: 'Find addresses by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @Get('addresses/:userId')
  async findManyByUserId(@Param('userId') userId: string): Promise<Address[]> {
    return this.addressesService.addresses({
      where: {
        userId: userId,
      },
    });
  }

  @ApiOperation({ summary: 'Update address by address id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Id' })
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const { city, addressLine, postal_code } = updateAddressDto;

    return this.addressesService.update({
      where: { address_id: id },
      data: {
        city,
        addressLine,
        postal_code,
      },
    });
  }

  @ApiOperation({ summary: 'Delete address by address id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Id' })
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<Address> {
    return this.addressesService.delete({ address_id: id });
  }
}
