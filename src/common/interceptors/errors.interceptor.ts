import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    BadGatewayException
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle()
            .pipe(
                catchError(error => throwError(new BadGatewayException())),
            );
    }
}
