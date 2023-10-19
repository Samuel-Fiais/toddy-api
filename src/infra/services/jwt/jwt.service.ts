import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
  IJwtService,
  IJwtServicePayload,
} from "src/domain/services/jwt.interface";

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  createToken(payload: IJwtServicePayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}
