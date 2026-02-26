import { User } from "src/users/user.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column({ default: false })
    concluida: boolean;

    @ManyToMany(() => User, user => user.tasks)
    user: User;
}