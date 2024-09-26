import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { env } from '../../../apps/auth-svc/src/configs/environment-variable';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CipherGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const nonce = request.headers['x-nonce'];
    const timestamps = request.headers['x-timestamps'];
    const reqSignature = request.headers['x-signature'];

    const payload = request.headers['x-payload'];

    if (!nonce || !timestamps || !reqSignature || !payload) {
      throw new ForbiddenException('Invalid resource access behavior');
    }
    const message = nonce + timestamps + payload + env.auth.cipherAccess;
    const compareSignature = CryptoJS.HmacSHA256(
      message,
      env.auth.cipherAccess,
    ).toString(CryptoJS.enc.Base64);

    if (compareSignature !== reqSignature)
      throw new ForbiddenException('Invalid resource access behavior');
    return true;
  }
}
