import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty( { example: "Nome do cliente"} )
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: "exmaple@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  senha: string;
}