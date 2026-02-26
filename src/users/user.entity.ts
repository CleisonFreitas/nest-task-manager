import { Task } from "src/tasks/task.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    senha: string;

    @OneToMany(type => Task, task => task.user)
    tasks: Task[];
}