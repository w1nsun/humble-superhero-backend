import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SuperheroCreateDto,
  SuperheroGetDto,
  SuperheroMapper,
  SuperheroService,
} from '../../domain/superhero-management';
import { superheroCreateSchema } from '../../domain/superhero-management/validation/superhero.zod-schema';
import { ZodValidationPipe } from '../../infra/validation/zod-validation.pipe';

@ApiTags('Superheroes')
@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @ApiResponse({ type: SuperheroGetDto, status: HttpStatus.CREATED })
  @Post()
  createSuperhero(
    @Body(new ZodValidationPipe(superheroCreateSchema)) reqDto: SuperheroCreateDto,
  ): SuperheroGetDto {
    const superhero = this.superheroService.save(reqDto);

    return SuperheroMapper.toGetDto(superhero);
  }

  @ApiResponse({ type: SuperheroGetDto, isArray: true })
  @Get()
  getSuperheroes(): SuperheroGetDto[] {
    const superheroes = this.superheroService.findAll({
      sortBy: 'humilityScore',
      sortOrder: 'desc',
    });

    return SuperheroMapper.toGetDtoList(superheroes);
  }
}
