import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistException extends BadRequestException {
  constructor() {
    super('E-mail already in use');
  }
}
