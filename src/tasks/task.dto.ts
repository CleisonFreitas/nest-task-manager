import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class TaskDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({ example: 'Cadastrar workflow' })
    titulo: string;

    @IsOptional()
    @MinLength(3)
    @MaxLength(500)
    @ApiProperty({ example: 'Documentação de novo workflow' })
    descricao?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ example: true })
    concluida?: boolean;
}