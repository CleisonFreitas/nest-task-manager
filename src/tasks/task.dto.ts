import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class TaskDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    titulo: string;

    @IsOptional()
    @MinLength(3)
    @MaxLength(500)
    descricao?: string;

    @IsBoolean()
    @IsOptional()
    concluida?: boolean;
}