import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn() {
    return 'Signed In';
  }

  signUp() {
    return 'Signed Up';
  }
}
