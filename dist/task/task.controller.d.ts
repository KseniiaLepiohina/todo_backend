import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<any>;
    findActiveTasks(req: any): Promise<import("./entities/ActiveTasks.entity").ActiveTasks[]>;
    updateActiveTask(id: number, dto: UpdateTaskDto): Promise<any>;
    deleteActiveTask(taskId: number, userId: number): Promise<{
        message: string;
    }>;
    newCompletedTask(taskId: number, userId: number): Promise<any>;
    findCompletedTasks(): Promise<import("./entities/CompletedTasks.entity").CompletedTasks[]>;
    updateCompletedTask(id: number, title: string, description: string): Promise<any>;
    deleteCompletedTask(taskId: number, userId: number): Promise<{
        message: string;
    }>;
}
