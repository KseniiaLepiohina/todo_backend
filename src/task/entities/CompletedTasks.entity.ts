import { Auth } from "src/auth/entities/auth.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: 'timestamp',default:()=> 'CURRENT_TIMESTAMP' })
  completedAt: Date;

  @ManyToOne(() => Auth, (auth) => auth.completedTasks,{ onDelete: 'CASCADE' })
  user: Auth;
  @Column()
  user_id: number;
}