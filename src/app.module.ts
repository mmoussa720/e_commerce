import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ProductModule, OrderModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
