import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Matches,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'First name must only contain letters, spaces, hyphens, or apostrophes',
  })
  @ApiProperty()
  firstName: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'First name must only contain letters, spaces, hyphens, or apostrophes',
  })
  @ApiProperty()
  lastName: string;
  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  role: Role;
  @ApiProperty()
  verified?: boolean;
}
