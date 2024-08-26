import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        // NODE_ENV: Joi.string()
        //   .valid('development', 'production', 'test', 'provision', 'staging')
        //   .required(),
        PORT: Joi.number().port().default(9090),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
