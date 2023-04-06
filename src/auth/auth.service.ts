import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from "argon2";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: AuthDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new ForbiddenException("Credentials Incorrect");
      const pwdCompare = await argon.verify(user.password, dto.password);
      if (!pwdCompare) {
        throw new ForbiddenException("Credentials Incorrect");
      }
      delete user.password;
      return user;
    } catch (err) {
      if (err.code === "P2002") {
        throw err;
      }
    }
  }

  async signUp(dto: AuthDTO) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (err) {
      if (err.code === "P2002") {
        throw new ForbiddenException("Credentials Taken");
      }
      throw err;
    }
  }
}
