import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RolesGuard } from './common/guards/roles.guard';
import { NullTransformInterceptor } from './common/interceptors/null-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard());
  app.useGlobalInterceptors(new NullTransformInterceptor());

  await app.listen(3000);
}
bootstrap();
