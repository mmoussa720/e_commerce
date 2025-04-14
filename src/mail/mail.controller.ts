import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { ResponseDto } from 'src/utils/response.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('mail')
@ApiTags('mail')
@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@ApiOkResponse({
  description: 'mail response',
  type: ResponseDto,
})
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  create(@Body() emailDto: CreateMailDto) {
    return this.mailService.sendEmail(emailDto);
  }
}
