import { Auth } from "src/auth/entities/auth.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CompletedTasks {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  uuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'completed' })
  status: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  completedAt: Date;

  @ManyToOne(() => Auth, (auth) => auth.tasks,{ onDelete: 'CASCADE' })
  user: Auth;
}