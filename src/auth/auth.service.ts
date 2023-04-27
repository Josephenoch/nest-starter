import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  signIn() {
    return "signed in successfully";
  }

  signUp() {
    return "signed up succesfully";
  }
}
