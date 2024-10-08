import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthSvcController } from './auth-svc.controller';
import { AuthSvcService } from './auth-svc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import {
  dataSourceConfig,
  dataSourceConfigMongoDB,
} from './configs/data-source';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity } from './modules/users/entities/user.entity';
import UserRepository from './modules/users/repositories/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { env } from './configs/environment-variable';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { JwtAuthGuard } from '@app/commons/guards/jwt.guards';
import { KycModule } from '@app/kyc';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    MongooseModule.forRoot(dataSourceConfigMongoDB.connect),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: env.auth.secret,
      signOptions: {
        expiresIn: '90s',
      },
    }),
    KycModule,
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
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthSvcModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
