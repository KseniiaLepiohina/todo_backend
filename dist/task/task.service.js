"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ActiveTasks_entity_1 = require("./entities/ActiveTasks.entity");
const CompletedTasks_entity_1 = require("./entities/CompletedTasks.entity");
let TaskService = class TaskService {
    ActiveTasksRepository;
    dataSource;
    CompletedTasksRepository;
    constructor(ActiveTasksRepository, dataSource, CompletedTasksRepository) {
        this.ActiveTasksRepository = ActiveTasksRepository;
        this.dataSource = dataSource;
        this.CompletedTasksRepository = CompletedTasksRepository;
    }
    async createTask(createTaskDto, userId) {
        try {
            console.log('Creating task with:', { userId, ...createTaskDto });
            const newTask = await this.dataSource
                .createQueryBuilder()
                .insert()
                .into(ActiveTasks_entity_1.ActiveTasks)
                .values([{
                    userId: userId,
                    title: createTaskDto.title ?? 'Untitled task',
                    description: createTaskDto.description ?? ''
                }])
                .returning('*')
                .execute();
            console.log('Inserted task:', newTask.raw[0]);
            return newTask.raw[0];
        }
        catch (error) {
            console.error('Error creating task:', error);
            throw new common_1.HttpException('Failed to create task', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllActiveTasks(userId) {
        try {
            const tasks = await this.dataSource
                .createQueryBuilder(ActiveTasks_entity_1.ActiveTasks, 'task')
                .select([
                'task.taskId',
                'task.title',
                'task.description',
                'task.completed',
                'task.createdAt',
            ])
                .where('task.completed = :completed', { completed: false })
                .andWhere('task.userId = :userId', { userId })
                .getMany();
            return tasks;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch all active tasks', 500);
        }
    }
    async updateActiveTask(id, dto) {
        try {
            const result = await this.dataSource
                .createQueryBuilder()
                .update(ActiveTasks_entity_1.ActiveTasks)
                .set({
                title: dto.title,
                description: dto.description,
            })
                .where('taskId = :id', { id })
                .returning('*')
                .execute();
            if (!result.affected) {
                throw new common_1.NotFoundException(`Task ${id} not found`);
            }
            return result.raw[0];
        }
        catch {
            throw new common_1.HttpException('Task not updated', 400);
        }
    }
    async deleteActiveTask(taskId, userId) {
        try {
            const result = await this.dataSource
                .createQueryBuilder()
                .delete()
                .from(ActiveTasks_entity_1.ActiveTasks)
                .where('taskId = :taskId AND userId = :userId', { taskId, userId })
                .execute();
            if (!result.affected) {
                throw new common_1.NotFoundException(`Task ${taskId} not found for user ${userId}`);
            }
            return { message: 'Task successfully deleted' };
        }
        catch {
            throw new common_1.HttpException('Task deletion failed', 500);
        }
    }
    async sendToCompletedTask(userId, taskId) {
        try {
            const activeTask = await this.dataSource
                .createQueryBuilder(ActiveTasks_entity_1.ActiveTasks, 'a')
                .where('a.taskId = :taskId', { taskId })
                .andWhere('a.userId = :userId', { userId })
                .andWhere('a.completed = false')
                .getOne();
            if (!activeTask) {
                throw new common_1.HttpException('Task not found or already completed', 404);
            }
            const completedTask = await this.dataSource.createQueryBuilder()
                .insert()
                .into(CompletedTasks_entity_1.CompletedTasks)
                .values({
                title: activeTask.title,
                description: activeTask.description,
                completed: true,
                userId: activeTask.userId
            })
                .returning('*')
                .execute();
            await this.dataSource
                .createQueryBuilder()
                .delete()
                .from(ActiveTasks_entity_1.ActiveTasks)
                .where('taskId = :id', { taskId })
                .andWhere('userId = :userId', { userId })
                .execute();
            return completedTask.raw[0];
        }
        catch (error) {
            throw new common_1.HttpException('Failed to transfer to completed tasks', 500);
        }
    }
    async findAllCompletedTasks() {
        try {
            const tasks = await this.dataSource
                .createQueryBuilder(CompletedTasks_entity_1.CompletedTasks, 'task')
                .select([
                'task.id',
                'task.title',
                'task.description',
                'task.completed',
                'task.completedAt',
                'task.userId',
            ])
                .where('task.completed =:true', {
                completed: true
            })
                .getMany();
            return tasks;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch all completed tasks', 500);
        }
    }
    async updateCompletedTask(id, title, description) {
        try {
            const result = await this.dataSource
                .createQueryBuilder()
                .update(CompletedTasks_entity_1.CompletedTasks)
                .set({ title, description })
                .where('id = :id', { id })
                .returning('*')
                .execute();
            if (!result.affected) {
                throw new common_1.NotFoundException(`Completed task ${id} not found`);
            }
            return result.raw[0];
        }
        catch {
            throw new common_1.HttpException('Completed task not updated', 400);
        }
    }
    async deleteCompletedTask(taskId, userId) {
        try {
            const deletedTask = await this.dataSource
                .createQueryBuilder()
                .delete()
                .from(CompletedTasks_entity_1.CompletedTasks)
                .where('id = :taskId AND userId = :userId')
                .execute();
            if (deletedTask.affected === 0) {
                throw new common_1.NotFoundException(`Task with id ${taskId} not found for user ${userId}`);
            }
            return { message: 'Task successfully deleted' };
        }
        catch (error) {
            throw new common_1.HttpException('Task deletion failed', 500);
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ActiveTasks_entity_1.ActiveTasks)),
    __param(2, (0, typeorm_1.InjectRepository)(CompletedTasks_entity_1.CompletedTasks)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource,
        typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map