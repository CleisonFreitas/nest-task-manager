import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class TaskDTO {
    @IsString({ message: 'O título deve ser uma string' })
    @MinLength(3, { message: 'O título deve conter pelo menos 3 caracteres' })
    @MaxLength(100, { message: 'O título deve conter no máximo 100 caracteres' })
    @ApiProperty({ example: 'Cadastrar workflow' })
    titulo: string;

    @IsOptional()
    @MinLength(3, { message: 'A descrição deve conter pelo menos 3 caracteres' })
    @MaxLength(500, { message: 'A descrição deve conter no máximo 500 caracteres' })
    @ApiProperty({ example: 'Documentação de novo workflow' })
    descricao?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ example: true })
    concluida?: boolean;
}