import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  signIn() {
    return 'Signed In';
  }

  signUp() {
    return 'Signed Up';
  }
}
