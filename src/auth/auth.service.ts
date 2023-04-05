import { Injectable } from '@nestjs/common';
@Injectable({})
export class AuthService {
  login() {
    return {
      msg: 'I have logged Up',
    };
  }

  signUp() {
    return {
      msg: 'I have signed Up',
    };
  }
}
