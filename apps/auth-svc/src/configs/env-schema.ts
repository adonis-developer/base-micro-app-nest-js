import * as Joi from 'joi';

export const envSchema = Joi.object({
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
