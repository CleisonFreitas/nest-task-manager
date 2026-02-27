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

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectModel('TaskMetadata')
        private readonly taskMetadataModel: Model<any>
    ) {}

    async findAll(userId: string| number): Promise<Task[]> {
        return this.taskRepository.find({
            where: { user: { id: userId as number } },
            relations: ['user'],
        });
    }

    async findOne(id: number, userId: number): Promise<Task> {
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

    async create(dto: TaskDTO, user: User): Promise<Task> {
        const task = await this.taskRepository.save({
            ...dto,
            user,
        });

        await this.taskMetadataModel.create({
            taskId: task.id,
            historicoAlteracoes: ['Criada'],
            tags: [],
        });

        return task;
    }

    async update(
        id: number,
        dto: TaskDTO,
        userId: number,
    ): Promise<Task> {

        const task = await this.findOne(id, userId);

        Object.assign(task, dto);

        const updatedTask = await this.taskRepository.save(task);

        await this.taskMetadataModel.updateOne(
            { taskId: id },
            { $push: { historicoAlteracoes: 'Atualizada' } }
        );

        return updatedTask;
    }

    async delete(id: number, userId: number): Promise<void> {
        const task = await this.findOne(id, userId);

        await this.taskRepository.remove(task);

        await this.taskMetadataModel.deleteOne({ taskId: id });
    }
}