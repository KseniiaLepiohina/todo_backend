import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async createUser(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signUpUser(createAuthDto);
  }
  @Post('login')
  async loginUser(@Body() CreateAuthDto: CreateAuthDto) {
    const user = await this.authService.loginUser(CreateAuthDto);
    return {
      id: user.id,
      username: user.username,
    };
  }

  @Get()
  async findAll() {
    return await this.authService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authService.findOneUser(+id);
  }
}
