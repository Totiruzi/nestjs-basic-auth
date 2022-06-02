import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
    ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    // const token = this.jwtService.sign(tokenPayload, { expiresIn: this.configService.get<number>('JWT_EXPIRES_IN') });
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })
  }

  async logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

}
