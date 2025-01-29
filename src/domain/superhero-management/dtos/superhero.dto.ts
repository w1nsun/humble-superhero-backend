import { ApiProperty } from '@nestjs/swagger';
import { TSuperheroGetSchema } from '../validation/superhero.zod-schema';

export class SuperheroCreateDto {
  @ApiProperty({ example: 'Thor' })
  name!: string;

  @ApiProperty({ example: 'Thunder' })
  super_power!: string;

  @ApiProperty({ example: 7 })
  humility_score!: number;
}

export class SuperheroGetDto implements TSuperheroGetSchema {
  @ApiProperty({ example: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' })
  id!: string;

  @ApiProperty({ example: 'Thor' })
  name!: string;

  @ApiProperty({ example: 'Thunder' })
  super_power!: string;

  @ApiProperty({ example: 7 })
  humility_score!: number;
}

export type TSuperheroSortOrder = 'asc' | 'desc';
export type TSuperheroSortBy = 'humilityScore';
export type TSuperheroSort = {
  sortBy: TSuperheroSortBy;
  sortOrder: TSuperheroSortOrder;
};
