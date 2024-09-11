import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['authorization'];
    const refreshToken = request.headers['x-refresh'];

    if (!accessToken || !refreshToken) {
      throw new HttpException(
        'Access token or refresh token is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
