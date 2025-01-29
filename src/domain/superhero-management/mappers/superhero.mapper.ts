import { SuperheroGetDto } from '../dtos/superhero.dto';
import { Superhero } from '../entities/superhero.entity';

/**
 * Mapper to avoid disclosing unwanted entity fields, and also to convert camelCase to snake_case.
 */
export class SuperheroMapper {
  static toGetDto(superhero: Superhero): SuperheroGetDto {
    return {
      id: superhero.id,
      name: superhero.name,
      super_power: superhero.superPower,
      humility_score: superhero.humilityScore,
    };
  }

  static toGetDtoList(superheroes: Superhero[]): SuperheroGetDto[] {
    return superheroes.map((superhero: Superhero) => SuperheroMapper.toGetDto(superhero));
  }
}
