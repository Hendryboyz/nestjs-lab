import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        const timeoutMs = 5000;
        return next.handle()
            .pipe(
                timeout(timeoutMs),
                catchError(error => {
                    if (error instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException);
                    }
                    return throwError(error);
                })
            );
    }
}
