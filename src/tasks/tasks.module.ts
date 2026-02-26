import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.provider';
import { DatabaseModule } from 'src/database/database.module';
import { MongoModule } from 'src/database/mongo.module';
import { taskMetadataProviders } from 'src/database/task-metadata.providers';

@Module({
  imports: [
    DatabaseModule,
    MongoModule
  ],
  providers: [
    ...tasksProviders,
    ...taskMetadataProviders,
    TasksService,
  ],
  controllers: [TasksController]
})
export class TasksModule { }
