import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @Transform(({ value }) => new Decimal(value))
  price: Decimal;
  sellerId: string;
}
