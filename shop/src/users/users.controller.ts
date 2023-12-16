import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordService } from 'src/auth/password.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private passwordService: PasswordService,
  ) {}

  @ApiOperation({ summary: 'Find all user' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find user by user Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.user({ user_id: id });
  }

  @ApiOperation({ summary: 'Find user by Email' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @Roles(Role.ADMIN)
  @Get('user/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.user({
      email: email,
    });
  }

  @ApiOperation({ summary: 'Update user by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Invalid password or other fields' })
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password, firstName, lastName, phoneNumber } = updateUserDto;
    const user = await this.usersService.user({ user_id: id });
    const check = await this.passwordService.compare(
      password,
      user.password_hash,
    );

    if (!check) {
      throw new BadRequestException('Invalid password!');
    }

    return this.usersService.update({
      where: { user_id: id },
      data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      },
    });
  }

  @ApiOperation({ summary: 'Update user by Email' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Invalid password or other fields' })
  @Patch('user/:email')
  async updateByEmail(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password, firstName, lastName, phoneNumber } = updateUserDto;
    const user = await this.usersService.user({ email: email });
    const check = await this.passwordService.compare(
      password,
      user.password_hash,
    );

    if (!check) {
      throw new BadRequestException('Invalid password!');
    }

    return this.usersService.update({
      where: { email: email },
      data: {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      },
    });
  }

  @ApiOperation({ summary: 'Change password by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Invalid old password' })
  @Patch('pass/:id')
  async updatePasswordById(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { old_password, new_password } = updatePasswordDto;
    const user = await this.usersService.user({ user_id: id });
    const check = await this.passwordService.compare(
      old_password,
      user.password_hash,
    );

    if (!check) {
      throw new BadRequestException('Invalid old password!');
    }

    return this.usersService.update({
      where: { user_id: id },
      data: {
        password_hash: await this.passwordService.hash(new_password),
      },
    });
  }

  @ApiOperation({ summary: 'Change password by Email' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiBadRequestResponse({ description: 'Invalid old password' })
  @Patch('pass/:email')
  async updatePasswordByEmail(
    @Param('email') email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { old_password, new_password } = updatePasswordDto;
    const user = await this.usersService.user({ email: email });
    const check = await this.passwordService.compare(
      old_password,
      user.password_hash,
    );

    if (!check) {
      throw new BadRequestException('Invalid old password!');
    }

    return this.usersService.update({
      where: { email: email },
      data: {
        password_hash: await this.passwordService.hash(new_password),
      },
    });
  }

  @ApiOperation({ summary: 'Delete user by Id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Id' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.usersService.delete({
      user_id: id,
    });
  }

  @ApiOperation({ summary: 'Delete user by Email' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Requires Role ADMIN' })
  @ApiInternalServerErrorResponse({ description: 'Invalid Email' })
  @Roles(Role.ADMIN)
  @Delete('user/:email')
  async deleteByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.delete({
      email: email,
    });
  }
}
