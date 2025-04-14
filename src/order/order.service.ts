import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
const currency = require('currency.js');
import { plainToInstance } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const { price } = await this.prismaService.product.findUnique({
      where: { id: createOrderDto.productId },
    });
    const totalPrice = await this.calculateTotalPrice(
      price,
      createOrderDto.quantity,
    );
    const dto = plainToInstance(CreateOrderDto, createOrderDto);
    const purchase = await this.prismaService.order.create({
      data: {
        productId: dto.productId,
        customerId: dto.customerId,
        quantity: dto.quantity,
        totalPrice,
      },
    });
    return purchase;
  }
  calculateTotalPrice(price: Decimal, quantity: number) {
    const totalPrice = currency(price.toNumber()).multiply(quantity);
    return totalPrice.value;
  }
}
