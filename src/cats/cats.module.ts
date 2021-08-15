import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/all-exceptions.filter';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
    controllers: [CatsController],
    providers: [
        CatsService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
    exports: [CatsService]
})
export class CatsModule {}
