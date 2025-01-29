import { Module } from '@nestjs/common';

import { SuperheroController } from './controllers/superhero.controller';

@Module({
  controllers: [SuperheroController],
})
export class AppModule {}
