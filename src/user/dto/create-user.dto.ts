import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { Role } from 'generated/prisma';
export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'First name must only contain letters, spaces, hyphens, or apostrophes',
  })
  firstName: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'First name must only contain letters, spaces, hyphens, or apostrophes',
  })
  lastName: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  role: Role;
  @Expose()
  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
