import { Auth } from 'src/auth/entities/auth.entity';
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActiveTasks {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Generated('uuid')
  uuid: string;
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ManyToOne(() => Auth, (auth) => auth.tasks,{ onDelete: 'CASCADE' })
  user: Auth;
}
