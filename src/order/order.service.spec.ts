import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;
  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should calculate the total price', () => {
    const result = service.calculateTotalPrice(Decimal(75.5), 15);
    console.log(service.calculateTotalPrice(Decimal(75.5), 15));
    expect(result).toEqual(1132.5);
    console.log(expect(result).toEqual(1132.5));
  });
});
