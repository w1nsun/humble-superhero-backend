import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.status ? Number(exception.status) : HttpStatus.INTERNAL_SERVER_ERROR;

    let code = exception?.code;

    if (exception instanceof BadRequestException) {
      code = 'VALIDATION_FAILED';
    }

    if (exception instanceof NotFoundException) {
      code = exception['code'] || 'NOT_FOUND';
    }

    if (!code && status == 500) {
      code = 'INTERNAL_SERVER_ERROR';
    }

    const error: Record<string, any> = {
      message: exception?.response?.error || exception.message,
      code: code,
      status_code: status,
    };

    if (exception?.response?.data) {
      error.data = exception?.response?.data;
    }

    if (exception?.response?.errors) {
      error.errors = exception.response.errors;
    }

    response.status(status).json({ ...error });
  }
}
