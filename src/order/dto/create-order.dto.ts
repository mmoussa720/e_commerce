import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsInt, isInt, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  productId: string;
  @IsString()
  customerId: string;
  @IsInt()
  quantity: number;
  @Transform(({ value }) => new Decimal(value))
  totalPrice: Decimal;
}
