import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateOAuthLogin(profile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    provider: string;
  }) {

    let user = await this.usersRepository.findOne({ where: { "email": profile.email } });

    if (!user) {
      let newUser = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.picture,
        email: profile.email,
        provider: profile.provider,
        accountId: profile.id,
      }
      newUser = this.usersRepository.create(newUser);
      user = await this.usersRepository.save(newUser);
    }

    const payload = { email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName, picture: user.picture };

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        id: user.id,
        email: user.email,
        accessToken: this.jwtService.sign(payload)
    };
  }

  async IsUserExist(email: string) {
    const user = await this.usersRepository.findOne({ where: { "email": email } });
    return !!user;
  }
}
