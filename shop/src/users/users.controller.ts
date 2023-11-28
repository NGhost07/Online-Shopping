import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordService } from 'src/auth/password.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private passwordService: PasswordService,
  ) {}

  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.user({ user_id: id });
  }

  @Roles(Role.ADMIN)
  @Get('user/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.user({
      email: email,
    });
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { firstName, lastName, password, phoneNumber, role } = updateUserDto;

    return this.usersService.update({
      where: { user_id: id },
      data: {
        first_name: firstName,
        last_name: lastName,
        password_hash: await this.passwordService.hash(password),
        phone_number: phoneNumber,
        role: role,
      },
    });
  }

  @Patch('user/:email')
  async updateByEmail(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { firstName, lastName, password, phoneNumber, role } = updateUserDto;
    return this.usersService.update({
      where: { email: email },
      data: {
        first_name: firstName,
        last_name: lastName,
        password_hash: await this.passwordService.hash(password),
        phone_number: phoneNumber,
        role: role,
      },
    });
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.usersService.delete({
      user_id: id,
    });
  }

  @Roles(Role.ADMIN)
  @Delete('user/:email')
  async deleteByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.delete({
      email: email,
    });
  }
}
