import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
// import {}
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signIn(dto: AuthDTO) {
    return 'Signed In';
  }

  signUp() {
    return 'Signed Up';
  }
}
