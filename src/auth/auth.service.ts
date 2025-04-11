import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingHelper } from 'src/helper/hashing.helper';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  async generateTokens(payload: any): Promise<any> {
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
  async login(dto: LoginDto): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await HashingHelper.compareData(
      dto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password !');
    }
    const { accessToken, refreshToken } = await this.generateTokens({
      sub: user.id,
      email: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async register(userData: CreateUserDto) {
    const createdUser = await this.userService.create(userData);
    const { accessToken, refreshToken } = await this.generateTokens({
      sub: createdUser.id,
      email: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      verified: createdUser.verified,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshToken(refreshTok: string) {
    try {
      const decoded = await this.jwtService.verify(refreshTok, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.prismaService.user.findUnique({
        where: {
          id: decoded?.sub,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found !');
      }
      const { accessToken, refreshToken } = await this.generateTokens({
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        verified: user.verified,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh tokne !');
    }
  }
}
