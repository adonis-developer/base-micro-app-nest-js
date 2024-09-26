import { NestFactory } from '@nestjs/core';
import { AuthSvcModule } from './auth-svc.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { IUserModel } from './modules/users/interfaces/users.interface';
import { TransformInterceptor } from 'libs/interceptors/transform.interceptor';
import { CipherGuard } from '@app/commons/guards/cipher.guards';

async function bootstrap() {
  const app = await NestFactory.create(AuthSvcModule);
  app.useGlobalGuards(new CipherGuard());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new TransformInterceptor<Omit<IUserModel, 'password'>>(),
  );

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
