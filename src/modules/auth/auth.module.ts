// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { Users } from '@modules/users/entity/user.entity';
// import { CONSTANTS } from '@utils/constants';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { GoogleStrategy } from './google.service';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       global: true,
//       secret: CONSTANTS.jwtConstants.secret,
//       signOptions: { expiresIn: CONSTANTS.jwtConstants.expiresAtString },
//     }),
//     JwtModule,
//     TypeOrmModule.forFeature([Users]),
//   ],
//   providers: [AuthService, GoogleStrategy],
//   controllers: [AuthController],
//   exports: [AuthService],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.service';
import { AuthController } from './auth.controller';
import { Users } from '../users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONSTANTS } from '@utils/constants';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: CONSTANTS.jwtConstants.secret,
      signOptions: { expiresIn: CONSTANTS.jwtConstants.expiresAtString },
    }),
    JwtModule,
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, GoogleStrategy, FacebookStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
