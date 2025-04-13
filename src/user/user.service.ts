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
import { plainToClass } from 'class-transformer';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);

      if (existingUser) {
        throw new UserAlreadyExistException();
      }
      let userData = plainToClass(CreateUserDto, createUserDto);
      const hashedPassword = await HashingHelper.hashData(
        createUserDto.password,
      );
      userData = {
        ...userData,
        password: hashedPassword,
      };
      const createdUser = await this.prismaService.user.create({
        data: {
          ...userData,
        },
      });
      const { password, ...result } = createdUser;
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error.message);
      throw new InternalServerErrorException(
        'An error occurred while creating the user',
      );
    }
  }
  async findAll() {
    try {
      const user = await this.prismaService.user.findMany();
      return user.map(({ password, ...rest }) => rest);
    } catch (error) {
      throw new InternalServerErrorException('Error Occured');
    }
  }
  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
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
      console.log(error.message);
      throw new InternalServerErrorException('Error Occured');
    }
  }
  async findByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      if (user != null) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error.message);
      throw new InternalServerErrorException('Error Occured');
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    try {
      if (updateUserDto.password != null) {
        await HashingHelper.hashData(updateUserDto.password);
      }
      return await this.prismaService.user.update({
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
      await this.prismaService.user.delete({
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
