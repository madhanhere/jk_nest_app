/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    if (!user) {
      throw new Error('user not found');
    }

    const response =  await this.authService.validateOAuthLogin(user);
    // res.redirect(`http://localhost.4200/dashboard?token=${response.accessToken}`);
    return res.redirect(
      `${process.env.GOOGLE_REDIRECT_URL_CLIENT}?jwtUser=${response.accessToken}`,
    );
    // return response;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res) {
    const user = req.user;
    if (!user) {
      throw new Error('user not found');
    }
    const response =  await this.authService.validateOAuthLogin(user);
    // res.redirect(`http://localhost.4200/dashboard?token=${response.accessToken}`);
    return res.redirect(
      `${process.env.GOOGLE_REDIRECT_URL_CLIENT}?jwtUser=${response.accessToken}`,
    );
  }

}