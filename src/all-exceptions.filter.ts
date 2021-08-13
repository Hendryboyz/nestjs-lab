import {
    Catch,
    ArgumentsHost,
    HttpServer,
} from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';

@Catch() // empty Catch decorator will cause catching everything effect
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(exception, host);
    }
}
