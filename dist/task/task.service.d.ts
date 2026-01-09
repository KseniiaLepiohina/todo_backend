import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DataSource, Repository } from 'typeorm';
import { ActiveTasks } from './entities/ActiveTasks.entity';
import { CompletedTasks } from './entities/CompletedTasks.entity';
export declare class TaskService {
    private ActiveTasksRepository;
    private readonly dataSource;
    private CompletedTasksRepository;
    constructor(ActiveTasksRepository: Repository<ActiveTasks>, dataSource: DataSource, CompletedTasksRepository: Repository<CompletedTasks>);
    createTask(createTaskDto: CreateTaskDto, userId: number): Promise<any>;
    findAllActiveTasks(userId: number): Promise<ActiveTasks[]>;
    updateActiveTask(id: number, dto: UpdateTaskDto): Promise<any>;
    deleteActiveTask(taskId: number, userId: number): Promise<{
        message: string;
    }>;
    sendToCompletedTask(userId: number, taskId: number): Promise<any>;
    findAllCompletedTasks(): Promise<CompletedTasks[]>;
    updateCompletedTask(id: number, title: string, description: string): Promise<any>;
    deleteCompletedTask(taskId: number, userId: number): Promise<{
        message: string;
    }>;
}
