import { ActiveTasks } from 'src/task/entities/ActiveTasks.entity';
import { CompletedTasks } from 'src/task/entities/CompletedTasks.entity';
export declare class Auth {
    id: number;
    username: string;
    password: string;
    activeTasks: ActiveTasks[];
    completedTasks: CompletedTasks[];
}
