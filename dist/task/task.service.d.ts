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
    createTask(createTaskDto: CreateTaskDto, user_id: number): Promise<any>;
    findAllActiveTasks(user_id: number): Promise<ActiveTasks[]>;
    updateActiveTask(id: number, dto: UpdateTaskDto): Promise<any>;
    deleteActiveTask(task_id: number, user_id: number): Promise<{
        message: string;
    }>;
    sendToCompletedTask(user_id: number, task_id: number): Promise<any>;
    findAllCompletedTasks(): Promise<CompletedTasks[]>;
    updateCompletedTask(id: number, title: string, description: string): Promise<any>;
    deleteCompletedTask(task_id: number, user_id: number): Promise<{
        message: string;
    }>;
}
