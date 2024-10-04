import * as path from 'path';
import * as Joi from 'joi';
import { config } from 'dotenv';

config({ path: path.resolve('./apps/auth-svc/.env') });

export const env = {
  port: process.env.PORT,
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
    secretRefresh: process.env.SECRET_JWT_REFRESH,
    cipherAccess: process.env.CIPHER_ACCESS,
    resetSecret: process.env.RESET_SECRET,
  },
  email: {
    host: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
    port: +process.env.EMAIL_PORT,
    user: process.env.EMAIL_USERNAME,
  },
};

const envSchema = Joi.object({
  PORT: Joi.number().port().default(9090),
  TYPE_ORM_HOST: Joi.string().required(),
  TYPE_ORM_PORT: Joi.string().required(),
  TYPE_ORM_USERNAME: Joi.string().required(),
  TYPE_ORM_PASSWORD: Joi.string().required(),
  TYPE_ORM_DATABASE: Joi.string().required(),
  TYPE_ORM_SCHEMA: Joi.string().required(),
  TYPE_ORM_LOGGING: Joi.boolean().default(false),
  TYPE_ORM_SSL: Joi.boolean().default(false),
  TYPE_ORM_TIMEOUT: Joi.number().default(1000),
  TYPE_ORM_POOLSIZE: Joi.number().default(10),
  SECRET_JWT: Joi.string().required(),
  SECRET_JWT_REFRESH: Joi.string().required(),
  CIPHER_ACCESS: Joi.string().required(),
  RESET_SECRET: Joi.string().required(),
});

envSchema
  .validateAsync(process.env, {
    abortEarly: false,
    stripUnknown: true,
  })
  .then(() => console.log('Load env successfully'))
  .catch((error) => {
    console.log('Load env fail:');
    console.table(
      error.details.map((err) => ({ msg: err.message, path: err.path })),
    );
    process.exit();
  });
