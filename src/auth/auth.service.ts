import { Injectable } from '@nestjs/common';
import { LoginAuthDTO, SignUpAuthDTO } from './dto';

@Injectable()
export class AuthService {
  signUp(dto: SignUpAuthDTO) {
    return 'signed up';
  }

  login(dto: LoginAuthDTO) {
    console.log(dto);
    return 'logged in';
  }
}
