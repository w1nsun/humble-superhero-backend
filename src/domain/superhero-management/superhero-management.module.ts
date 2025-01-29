import { Module } from '@nestjs/common';

import { ISuperheroRepository, SuperheroRepository } from './repositories/superhero.repository';
import { SuperheroService } from './services/superhero.service';

@Module({
  providers: [
    {
      provide: ISuperheroRepository,
      useClass: SuperheroRepository,
    },
    SuperheroService,
  ],
  exports: [SuperheroService],
})
export class SuperheroManagementModule {}
