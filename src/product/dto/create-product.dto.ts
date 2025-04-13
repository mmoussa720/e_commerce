import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform, Type } from 'class-transformer';
import { IsDecimal, Matches, Max, Min } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateProductDto {
  @Transform(({ value }) => new Decimal(value))
  price: number;
  @Type(() => Number)
  sellerId: string;
}
