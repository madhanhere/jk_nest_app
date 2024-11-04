import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { DB_CONFIG } from './dbConfig';

config();

export default new DataSource({
  ...DB_CONFIG,
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/migrations/*.ts'],
});
