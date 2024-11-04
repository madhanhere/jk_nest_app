import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { HealthModule } from '@modules/health/health.module';
import configuration from '@config/index';
import { ConfigKey } from '@config/configkeyMapping';

import { PostsModule } from '@modules/posts/posts.module';
import { DB_CONFIG } from '../dbConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...DB_CONFIG,
        secretKey: config.get(ConfigKey.SECRET_STRIPE),
        entities: [],
        autoLoadEntities: true,
        synchronize: true, // use migrations to modify table
        migrations: [],
        migrationsRun: false,
        // logging: true, // Use this for debugging SQL execution
      }),
    }),
    UsersModule,
    AuthModule,
    HealthModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
