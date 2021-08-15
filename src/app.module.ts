import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { logger } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { LoggingInterceptor  } from './common/interceptors/logging.interceptor';

@Module({
  imports: [CatsModule],
  providers:[
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cat', method: RequestMethod.DELETE }
      )
      .forRoutes(CatsController);
  }
}
