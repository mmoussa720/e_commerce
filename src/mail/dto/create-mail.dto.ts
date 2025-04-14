import { ApiProperty } from '@nestjs/swagger';

export class CreateMailDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  to: string;
  @ApiProperty()
  subject: string;
}
