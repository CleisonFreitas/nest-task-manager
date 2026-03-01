import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty( { example: "Nome do cliente"} )
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  @ApiProperty({ example: "example@example.com" })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @ApiProperty()
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
  senha: string;
}