import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class IsName implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value.match(/^[a-zA-Z\s'-]+$/)) {
      throw new BadRequestException(
        'First name must only contain letters, spaces, hyphens, or apostrophes',
      );
    }
    return value;
  }
}
