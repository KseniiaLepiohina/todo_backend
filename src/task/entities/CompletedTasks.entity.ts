import { Auth } from "src/auth/entities/auth.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('completed_tasks')
export class CompletedTasks {

  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  completedAt: Date;
  @Column({name:'userId'})
  userId: number;

  @ManyToOne(() => Auth, (auth) => auth.completedTasks,{ onDelete: 'CASCADE' })
  @JoinColumn({name:'user_id'})
  user: Auth;
}