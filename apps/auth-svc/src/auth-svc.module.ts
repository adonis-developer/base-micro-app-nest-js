import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthSvcController } from './auth-svc.controller';
import { AuthSvcService } from './auth-svc.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import {
  dataSourceConfig,
  dataSourceConfigMongoDB,
} from './configs/data-source';
// import { LoggerMiddleware } from '@app/middlewares';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity } from './modules/users/entities/user.entity';
import UserRepository from './modules/users/repositories/users.repository';
import { envSchema } from './configs/env-schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { env } from './configs/environment-variable';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { CipherGuard } from './guards/cipher.guards';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forRoot(dataSourceConfigMongoDB.connect),
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: envSchema,
      validationOptions: {
        abortEarly: false,
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: env.auth.secret,
      signOptions: {
        expiresIn: '90s',
      },
    }),
  ],
  controllers: [AuthSvcController],
  providers: [
    AuthSvcService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: CipherGuard,
    },
  ],
})
export class AuthSvcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
