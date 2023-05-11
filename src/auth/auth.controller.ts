import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  signIn(@Body() dto: AuthDTO) {
    console.log(dto.email);
    return this.authService.signIn();
  }
  @Post('signUp')
  signUp() {
    return this.authService.signUp();
  }
}
