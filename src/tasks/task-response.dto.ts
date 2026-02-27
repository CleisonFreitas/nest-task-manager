import { ApiProperty } from "@nestjs/swagger";

export class TaskResponseDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Estudar workflow' })
  titulo: string;

  @ApiProperty({ example: 'Aprofundar em criação de workflows' })
  descricao: string;

  @ApiProperty({ example: false })
  concluida: boolean;
}