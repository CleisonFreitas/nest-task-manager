import * as mongoose from 'mongoose';

export const TaskMetadataSchema = new mongoose.Schema({
  taskId: { type: Number, required: true },
  historicoAlteracoes: { type: [String], default: [] },
  tags: { type: [String], default: [] },
});