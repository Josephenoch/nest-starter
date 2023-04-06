import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { 
      msg: 'I have logged Up',
    };
  }

  signUp(dto: AuthDTO) {
    return {
      msg: 'I have signed Up',
    };
  }
}
