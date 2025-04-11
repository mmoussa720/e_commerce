import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  it('should create a new user', async () => {
    const userData = { email: 'test@test.com', password: 'password' };
    mockPrismaService.user.create.mockResolvedValue({
      ...userData,
      id: '123',
    });
    const dto = plainToClass(CreateUserDto, userData);
    const result = await userService.create(dto);
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(userData.email);
  });
  it('should throw a ConflictException if user already exists', async () => {
    const userData = { email: 'test@test.com', password: 'password' };
    const dto = plainToClass(CreateUserDto, userData);
    mockPrismaService.user.findUnique.mockResolvedValue(dto);
    await expect(userService.create(dto)).rejects.toThrow(ConflictException);
  });
  it('should return all users', async () => {
    const mockUsers = [
      { id: '123', email: 'test1@test.com' },
      { id: '456', email: 'test2@test.com' },
    ];
    mockPrismaService.user.findMany.mockResolvedValue(mockUsers);
    const result = await userService.findAll();
    expect(result).toEqual(mockUsers);
  });
});
