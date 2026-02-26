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
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './task.entity';
import { TaskDTO } from './task.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async index(@Req() req): Promise<Task[]> {
        return this.tasksService.findAll(req.user.id);
    }

    @Get(':id')
    async show(
        @Param('id', ParseIntPipe) id: number,
        @Req() req,
    ): Promise<Task> {
        return this.tasksService.findOne(id, req.user.id);
    }

    @Post()
    async create(
        @Body() dto: TaskDTO,
        @Req() req,
    ): Promise<Task> {
        return this.tasksService.create(dto, req.user);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: TaskDTO,
        @Req() req,
    ): Promise<Task> {
        return this.tasksService.update(id, dto, req.user.id);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Req() req,
    ): Promise<void> {
        return this.tasksService.delete(id, req.user.id);
    }
}