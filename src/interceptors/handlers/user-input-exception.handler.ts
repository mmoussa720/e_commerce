import { AuthServiceInputException } from 'src/auth/exceptions/auth-service-input.exception';
import { ExceptionHandler } from './exception.handler';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class UserInputExceptionHandler implements ExceptionHandler {
  handle(error: Error): void {
    if (error instanceof AuthServiceInputException) {
      throw new UnauthorizedException(error.message);
    }
  }
}
