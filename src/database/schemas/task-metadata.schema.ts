export class TaskMetadata {
    @Prop()
    taskId: number;

    @Prop()
    historicoAlteracoes: string[];

    @Prop()
    tags: string[];
}