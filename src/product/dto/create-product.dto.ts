import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @ApiProperty()
  name: string;
  @Transform(({ value }) => new Decimal(value))
  @ApiProperty()
  price: Decimal;
  @ApiProperty()
  sellerId: string;
}
