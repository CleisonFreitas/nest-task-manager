import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskMetadataSchema } from 'src/database/task-metadata.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    MongooseModule.forFeature([
      {
        name: 'TaskMetadata',
        schema: TaskMetadataSchema,
      },
    ]),
],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
