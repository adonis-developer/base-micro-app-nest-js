import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthSvcController } from './auth-svc.controller';
import { AuthSvcService } from './auth-svc.service';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { dataSourceConfig } from './configs/data-source';
import { LoggerMiddleware } from '@app/middlewares';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
    }),
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(9090),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  controllers: [AuthSvcController],
  providers: [AuthSvcService],
})
export class AuthSvcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
