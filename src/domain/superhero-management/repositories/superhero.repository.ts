import { Injectable } from '@nestjs/common';

import { Superhero } from '../entities/superhero.entity';
import { TSuperheroSort } from '../dtos/superhero.dto';

export interface ISuperheroRepository {
  save(superhero: Superhero): void;
  findAll(sort?: TSuperheroSort): Superhero[];
}

export const ISuperheroRepository = Symbol('ISuperheroRepository');

@Injectable()
export class SuperheroRepository implements ISuperheroRepository {
  private readonly superheroes: Superhero[] = [];

  save(superhero: Superhero): void {
    this.superheroes.push(superhero);
  }

  findAll(sort?: TSuperheroSort): Superhero[] {
    const superheroes = [...this.superheroes];

    if (!sort) {
      return superheroes;
    }

    if (sort.sortBy === 'humilityScore') {
      superheroes.sort((a, b) => {
        return sort.sortOrder === 'asc'
          ? a.humilityScore - b.humilityScore
          : b.humilityScore - a.humilityScore;
      });
    }

    return superheroes;
  }
}
