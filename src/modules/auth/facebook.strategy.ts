// src/auth/strategies/facebook.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from './auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private authService: AuthService,
  ) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
      scope: ['email'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    const id = profile.id;
    const { emails, name, photos } = profile;
    const userResponse = await this.authService.validateOAuthLogin({
      email: emails[0].value,
      id: id,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos.length ? photos[0].value : "",
      provider: profile.provider
    });
    done(null, userResponse);
  }
}
