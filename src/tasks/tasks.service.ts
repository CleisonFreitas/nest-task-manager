import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { Task } from './task.entity';
import { TaskDTO } from './task.dto';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { TaskResponseDTO } from './task-response.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectModel('TaskMetadata')
        private readonly taskMetadataModel: Model<any>
    ) { }

    async findAll(userId: number): Promise<TaskResponseDTO[]> {
        const tasks = await this.taskRepository.find({
            where: { user: { id: userId } },
        });

        return tasks.map(task => this.toResponseDTO(task));
    }

    async findOne(id: number, userId: number): Promise<TaskResponseDTO> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!task) {
            throw new NotFoundException('Task não encontrada');
        }

        if (task.user.id !== userId) {
            throw new ForbiddenException('Acesso negado');
        }

        return this.toResponseDTO(task);
    }

    async create(dto: TaskDTO, user: User): Promise<TaskResponseDTO> {
        const task = await this.taskRepository.save({
            ...dto,
            user,
        });

        await this.taskMetadataModel.create({
            taskId: task.id,
            historicoAlteracoes: ['Criada'],
            tags: [],
        });

        return this.toResponseDTO(task);
    }

    async update(
        id: number,
        dto: TaskDTO,
        userId: number,
    ): Promise<TaskResponseDTO> {

        const task = await this.findOneEntity(id, userId);

        Object.assign(task, dto);

        const updatedTask = await this.taskRepository.save(task);

        await this.taskMetadataModel.updateOne(
            { taskId: id },
            { $push: { historicoAlteracoes: 'Atualizada' } }
        );

        return this.toResponseDTO(updatedTask);
    }

    async delete(id: number, userId: number): Promise<void> {
        await this.findOneEntity(id, userId);

        await this.taskRepository.delete(id);

        await this.taskMetadataModel.deleteOne({ taskId: id });
    }

    private async findOneEntity(id: number, userId: number): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!task) {
            throw new NotFoundException('Task não encontrada');
        }

        if (task.user.id !== userId) {
            throw new ForbiddenException('Acesso negado');
        }

        return task;
    }

    private toResponseDTO(task: Task): TaskResponseDTO {
        return {
            id: task.id,
            titulo: task.titulo,
            descricao: task.descricao,
            concluida: task.concluida,
        };
    }
}