import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDTO, SignUpAuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpAuthDTO) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  login(@Body() dto: LoginAuthDTO) {
    return this.authService.login(dto);
  }
}
