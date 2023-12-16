import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ status: 200, description: 'Successfully register user!' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad request!' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal Server Error!',
  })
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: result,
      });
    } catch (err) {
      console.log(err);

      if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
        return response.status(400).json({
          status: 'Error!',
          message: 'Email already exists!',
        });
      }

      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, description: 'Successfully login!' })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Email or password incorrect!',
  })
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully login!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error!',
      });
    }
  }
}
