import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { AppService } from './app.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class AppModule {}
