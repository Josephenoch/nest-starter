import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
 import { AuthDTO } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signUp')
  signUp(@Body() dto: AuthDTO) {
    console.log(dto);
    return this.authService.signUp();
  }
  @Post('login')
  login() {
    return this.authService.login();
  }
}
