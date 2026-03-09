import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ActiveTasks } from './entities/ActiveTasks.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<any>;
    findActiveTasks(req: any): Promise<ActiveTasks[]>;
    updateActiveTask(id: number, dto: UpdateTaskDto): Promise<any>;
    deleteActiveTask(task_id: number, user_id: number): Promise<{
        message: string;
    }>;
    addToCompletedTasks(req: any, task: ActiveTasks): Promise<any>;
    findCompletedTasks(): Promise<import("./entities/CompletedTasks.entity").CompletedTasks[]>;
    updateCompletedTask(id: number, title: string, description: string): Promise<any>;
    deleteCompletedTask(task_id: number, user_id: number): Promise<{
        message: string;
    }>;
}
