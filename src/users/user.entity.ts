import { Task } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
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