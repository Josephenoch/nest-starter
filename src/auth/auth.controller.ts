import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDTO, SignInAuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  signIn(@Body() dto: SignInAuthDTO) {
    return this.authService.signIn(dto);
  }
  @Post('signUp')
  signUp(@Body() dto: SignUpAuthDTO) {
    return this.authService.signUp(dto);
  }
}
