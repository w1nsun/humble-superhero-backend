import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DomainModule } from './domain/domain.module';
import { AllExceptionsFilter } from './infra';

@Module({
  imports: [DomainModule, AppModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class MainModule {}
