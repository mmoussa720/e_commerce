import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingHelper } from 'src/helper/hashing.helper';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }
      const hashedPassword = await HashingHelper.hashData(
        createUserDto.password,
      );
      const createdUser = await this.prismaService.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
      const { password, ...result } = createdUser;
      return createdUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the user',
      );
    }
  }
  async findAll() {
    try {
      const users = await this.prismaService.users.findMany();
      return users.map(({ password, ...rest }) => rest);
    } catch (error) {
      throw new InternalServerErrorException('Error Occured');
    }
  }
  async findOne(id: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          id,
        },
      });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error Occured');
    }
  }
  async findByEmail(email: string) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email,
        },
      });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error Occured');
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("This user doasn't exist");
    }
    try {
      if (updateUserDto.password != null) {
        await HashingHelper.hashData(updateUserDto.password);
      }
      return await this.prismaService.users.update({
        where: {
          id,
        },
        data: {
          ...updateUserDto,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        if (error instanceof HttpException) {
          throw error;
        }
        return new InternalServerErrorException('Error Occured');
      }
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException("this user doasn't exist");
      }
      await this.prismaService.users.delete({
        where: {
          id,
        },
      });
      return 'User $id has been deleted Successfully';
    } catch (error) {
      throw error;
    }
  }
}
