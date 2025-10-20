import { ActiveTasks } from 'src/task/entities/ActiveTasks.entity';
import { CompletedTasks } from 'src/task/entities/CompletedTasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  uuid: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @OneToMany(() => ActiveTasks, (task: ActiveTasks) => task.user,{onDelete:'CASCADE'})
  activeTasks: ActiveTasks[];
 @OneToMany(() => CompletedTasks, (task: CompletedTasks) => task.user,{onDelete:'CASCADE'})
  completedTasks: CompletedTasks[];

}
