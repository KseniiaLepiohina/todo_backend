import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async createUser(
    @Body() createAuthDto: CreateAuthDto) {
      console.log(createAuthDto);
    return await this.authService.signUpUser(createAuthDto);
  }
@Post('login')
async loginUser(@Body() createAuthDto: CreateAuthDto) {
  const user = await this.authService.loginUser(createAuthDto);

  return {
    id: user.user.id,
    username: user.user.username,
    token: user.token,
  };
  console.log(user);
  
}

@Get('username')
async findUserByUsername(@Query('username') username:string) {
  return this.authService.findOneUser(username);
}


  @Get()
  async findAll() {
    return await this.authService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authService.findOneUser(id);
  }
}
