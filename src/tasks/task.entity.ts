import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descricao: string;

    @Column({ default: false })
    concluida: boolean;

    @ManyToOne(() => User, user => user.tasks)
    user: User;
}