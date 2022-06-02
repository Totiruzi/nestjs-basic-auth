import { JwtAuthGuard } from './gaurds/jwt-auth.guard';
import { CurrentUser } from './current-userdecorator';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './gaurds/local-auth.gaurd';
import { User } from 'src/users/models/user.model';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User, @Res({passthrough: true}) response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  IsAuthenticated(){ return true}

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(
    @Res({passthrough: true}) response: Response
  ) {
    this.authService.logout(response);
    response.json({});
  }
}
