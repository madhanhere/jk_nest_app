import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { DataSourceOptions } from 'typeorm';

export const ConfigKey = {
  PORT: 'PORT',
  BACKEND_PREFIX: 'backendPrefix',
  JWT_SECRET_KEY: 'jwtSecretKey',
  PGHOST: 'POSTGRES_HOST',
  PGPORT: 'POSTGRES_PORT',
  PGUSERNAME: 'POSTGRES_USER',
  PGUSERPWD: 'POSTGRES_PASSWORD',
  PGDATABASE: 'POSTGRES_DATABASE',
  MODE: 'MODE',
  SECRET_STRIPE: 'SEC_KEY_STRIPE',
  END_POINT_SECRET_STRIPE: 'END_POINT_SEC_STRIPE',
  AWS_ACCESS_KEY: 'AWS_ACCESS_KEY',
  AWS_SECRET_KEY: 'AWS_SECRET_KEY',
  AWS_REGION: 'AWS_REGION',
  AWS_BUCKET_NAME: 'AWS_BUCKET_NAME',
};

config();

const configService = new ConfigService();

export const DB_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: "testing.cv2g8y4gwmad.ap-southeast-2.rds.amazonaws.com",
  port: configService.get(ConfigKey.PGPORT),
  username: "postgres",
  password: "password",
  database: "posts",
  ssl: {
    rejectUnauthorized: false,
  },
};
