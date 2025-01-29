import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  public transform(value: any, metadata: ArgumentMetadata): unknown {
    const parseResult = this.schema.safeParse(value);

    if (!parseResult.success) {
      const { error } = parseResult;

      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.errors,
      });
    }

    return parseResult.data;
  }
}
