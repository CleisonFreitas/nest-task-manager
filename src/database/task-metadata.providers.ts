import { Connection } from 'mongoose';
import { TaskMetadataSchema } from './task-metadata.schema';

export const taskMetadataProviders = [
  {
    provide: 'TASK_METADATA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('TaskMetadata', TaskMetadataSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];