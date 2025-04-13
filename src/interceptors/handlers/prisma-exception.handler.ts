import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserAlreadyExistException } from 'src/user/exceptions/user-already-exist.exception';
import { ExceptionHandler } from './exception.handler';

export class PrismaExceptionHandler implements ExceptionHandler {
  handle(error: Error): void {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new UserAlreadyExistException();
      }
    }
  }
}
