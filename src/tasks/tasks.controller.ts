import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Post,
    UseGuards,
    Req,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDTO } from './task.dto';
import type { AuthReqType } from 'src/auth/auth-req.type';
import { User } from 'src/users/user.entity';
import { TaskResponseDTO } from './task-response.dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @ApiOperation({ summary: 'Listar tarefas do usuário autenticado' })
    @ApiOkResponse({
        description: 'Lista de tarefas',
        type: TaskResponseDTO,
        isArray: true,
    })
    @Get()
    async index(@Req() req: AuthReqType): Promise<TaskResponseDTO[]> {
        return this.tasksService.findAll(req.user.id);
    }

    @ApiOperation({ summary: 'Buscar tarefa por ID' })
    @ApiOkResponse({
        description: 'Tarefa encontrada',
        type: TaskResponseDTO,
    })

    @ApiOperation({ summary: 'Criar nova tarefa' })
    @ApiCreatedResponse({
        description: 'Tarefa criada com sucesso',
        type: TaskResponseDTO,
    })
    @Post()
    async create(
        @Body() dto: TaskDTO,
        @Req() req: { user: User },
    ): Promise<TaskResponseDTO> {
        return this.tasksService.create(dto, req.user);
    }

    @ApiOperation({ summary: 'Atualizar tarefa' })
    @ApiOkResponse({
        description: 'Tarefa atualizada',
        type: TaskResponseDTO,
    })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: TaskDTO,
        @Req() req: AuthReqType,
    ): Promise<TaskResponseDTO> {
        return this.tasksService.update(id, dto, req.user.id);
    }

    @ApiOperation({ summary: 'Remover tarefa' })
    @ApiNoContentResponse({
        description: 'Tarefa removida com sucesso',
    })
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: AuthReqType,
    ): Promise<void> {
        return this.tasksService.delete(id, req.user.id);
    }
}