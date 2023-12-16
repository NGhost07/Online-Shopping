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
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Carts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiOperation({ summary: 'Create new Cart' })
  @ApiCreatedResponse({ description: 'Successfully created Cart' })
  @ApiBadRequestResponse({ description: 'Bad request CreateCartDto' })
  @Post()
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    const { amount, userId, productId } = createCartDto;
    return this.cartsService.create({
      amount,
      user: {
        connect: { user_id: userId },
      },
      product: {
        connect: { product_id: productId },
      },
    });
  }

  @ApiOperation({ summary: 'Get all Carts' })
  @ApiOkResponse({ description: 'Ok' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @ApiOperation({ summary: 'Get Cart by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Cart Id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Cart | null> {
    return this.cartsService.cart({ cart_id: id });
  }

  @ApiOperation({ summary: 'Get Cart by User id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid User Id' })
  @Get('/userId/:userId')
  async findManyByUserId(@Param('userId') userId: string): Promise<Cart[]> {
    return this.cartsService.carts({
      where: { userId: userId },
    });
  }

  @ApiOperation({ summary: 'Update Cart by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid Cart Id',
  })
  @ApiBadRequestResponse({ description: 'Bad request UpdateCartDto' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const { amount, productId } = updateCartDto;
    return this.cartsService.update({
      where: { cart_id: id },
      data: {
        amount,
        product: {
          connect: { product_id: productId },
        },
      },
    });
  }

  @ApiOperation({ summary: 'Delete Cart by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Cart id' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.delete({ cart_id: id });
  }
}
