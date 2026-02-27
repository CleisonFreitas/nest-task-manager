import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: "exmaple@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  senha: string;
}