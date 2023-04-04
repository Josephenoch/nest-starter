import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signUp')
  signUp() {
    return 'I am signUp';
  }
  @Post('login')
  login() {
    return 'I am login';
  }
}
