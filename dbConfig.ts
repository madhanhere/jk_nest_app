import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { ConfigKey } from './src/config/configkeyMapping';
import { DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

export const DB_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: configService.get(ConfigKey.PGHOST),
  port: configService.get(ConfigKey.PGPORT),
  username: configService.get(ConfigKey.PGUSERNAME),
  password: configService.get(ConfigKey.PGUSERPWD),
  database: configService.get(ConfigKey.PGDATABASE),
  ssl: {
    rejectUnauthorized: false,
  },
};
