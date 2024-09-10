import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<any, T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(map((data) => instanceToPlain(data) as T));
  }
}
