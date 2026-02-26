import { DataSource } from "typeorm";
import { Task } from "./task.entity";

export const tasksProviders = [
    {
        provide: 'TASK_PROVIDER',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: ['DATA_SOURCE'],
    },
];