import { AuthServiceInputException } from './auth-service-input.exception';

export class InvalidEmailOrPasswordException extends AuthServiceInputException {
  constructor() {
    super('Invalid email or password');
  }
}
