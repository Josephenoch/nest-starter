import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDTO } from "./dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: AuthDTO) {
    // console.log(dto)
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
      return await this.signToken(user.id, user.email);
    } catch (err) {
      if (err.code === "P2002") {
        throw err;
      }
      console.log(err);
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

  async signToken(userID: number, email: string) {
    const payload = {
      sub: userID,
      email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      secret: this.config.get("JWT_SECRET"),
      expiresIn: "1w",
    });

    return {
      access_token,
    };
  }
}
