import { Inject, Injectable } from '@nestjs/common';
import { IdHelper } from '../../../infra';

import { SuperheroCreateDto, TSuperheroSort } from '../dtos/superhero.dto';
import { Superhero } from '../entities/superhero.entity';
import { ISuperheroRepository } from '../repositories/superhero.repository';

@Injectable()
export class SuperheroService {
  constructor(
    @Inject(ISuperheroRepository)
    private readonly superheroRepo: ISuperheroRepository,
  ) {}

  save(dto: SuperheroCreateDto): Superhero {
    const id = IdHelper.genID();
    const superhero = new Superhero(id, dto.name, dto.super_power, dto.humility_score);

    this.superheroRepo.save(superhero);

    return superhero;
  }

  findAll(sort: TSuperheroSort): Superhero[] {
    return this.superheroRepo.findAll(sort);
  }
}
