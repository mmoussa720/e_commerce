import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';

@Injectable()
export class ProductService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const seller = await this.userService.findOne(createProductDto.sellerId);
    if (!seller) {
      throw new UserNotFoundException();
    }
    const product = await this.prismaService.product.create({
      data: createProductDto,
    });
    return product;
  }
  async uploadProductImage(productId: string, imagePath: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
    await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data: {
        picture: imagePath,
      },
    });
    return {
      message: 'Image uploaded successfully',
      imagePath: `uploads/products/${imagePath}`,
    };
  }
  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.product.findUnique({
      where: {
      id
    }})
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prismaService.product.delete({ where: { id } });
  }


}
