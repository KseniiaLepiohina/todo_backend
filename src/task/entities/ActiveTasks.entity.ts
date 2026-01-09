import { Auth } from "src/auth/entities/auth.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('active_tasks')
export class ActiveTasks {
  @PrimaryGeneratedColumn()
  task_id: number;

  @Column({
    nullable:true
  })
  title: string;

  @Column({
    nullable:true
  })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp',default:()=> 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @ManyToOne(() => Auth, (auth) => auth.activeTasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Auth;
  
  @Column()
  user_id: number;
}
