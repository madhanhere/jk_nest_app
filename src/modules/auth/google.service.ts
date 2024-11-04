import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const id = profile.id;
    const { emails } = profile;

    const userResponse = await this.authService.validateOAuthLogin({
      email: emails[0].value,
      id: id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture: profile.photos.length ? profile.photos[0].value : "",
      provider: profile.provider
    });
    done(null, userResponse);
  }
}