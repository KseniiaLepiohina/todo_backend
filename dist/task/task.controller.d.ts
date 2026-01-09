import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<any>;
    findActiveTasks(req: any): Promise<import("./entities/ActiveTasks.entity").ActiveTasks[]>;
    updateActiveTask(id: number, dto: UpdateTaskDto): Promise<any>;
    deleteActiveTask(task_id: number, user_id: number): Promise<{
        message: string;
    }>;
    newCompletedTask(task_id: number, user_id: number): Promise<any>;
    findCompletedTasks(): Promise<import("./entities/CompletedTasks.entity").CompletedTasks[]>;
    updateCompletedTask(id: number, title: string, description: string): Promise<any>;
    deleteCompletedTask(task_id: number, user_id: number): Promise<{
        message: string;
    }>;
}
