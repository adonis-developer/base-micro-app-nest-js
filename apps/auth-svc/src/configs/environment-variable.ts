import { config } from 'dotenv';
import * as path from 'path';
config({ path: path.resolve('./apps/auth-svc/.env') });

export const env = {
  database: {
    host: process.env.TYPE_ORM_HOST,
    port: parseInt(process.env.TYPE_ORM_PORT, 10) ?? 5432,
    username: process.env.TYPE_ORM_USERNAME,
    password: process.env.TYPE_ORM_PASSWORD,
    database: process.env.TYPE_ORM_DATABASE,
    schema: process.env.TYPE_ORM_SCHEMA,
    appName: process.env.APP_NAME ?? 'api-default',
    logging: process.env.TYPE_ORM_LOGGING === 'true',
    ssl: process.env.TYPE_ORM_SSL === 'true',
    timeout: Number(process.env.TYPE_ORM_TIMEOUT ?? 1000),
    poolSize: Number(process.env.TYPE_ORM_POOLSIZE ?? 10),
  },
  auth: {
    secret: process.env.SECRET_JWT,
  },
};
