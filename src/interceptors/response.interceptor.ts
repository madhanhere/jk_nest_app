import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor
  implements NestInterceptor<any, Response<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    return next.handle().pipe(
      map((response) => {
        if (!response?.data) {
          return {
            data: response,
            message: 'Success',
            statusCode: 200,
            reqId: context.switchToHttp().getRequest().reqId,
          };
        }
        const { data = {}, message = 'Success', statusCode = 200 } = response;
        return {
          data,
          message,
          statusCode,
          reqId: context.switchToHttp().getRequest().reqId,
        };
      }),
    );
  }
}
