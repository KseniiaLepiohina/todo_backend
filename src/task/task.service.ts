import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ActiveTasks } from './entities/ActiveTasks.entity';
import { CompletedTasks } from './entities/CompletedTasks.entity';
import { CreateCompletedTaskDto } from './dto/create-completed-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(ActiveTasks)
    private ActiveTasksRepository: Repository<ActiveTasks>,
private readonly dataSource:DataSource,
    @InjectRepository(CompletedTasks)
    private CompletedTasksRepository: Repository<CompletedTasks>,
  ) {}

  // === Active Tasks ===
async createTask(createTaskDto: CreateTaskDto, user_id: number) {
  try {
    console.log('Creating task with:', { user_id, ...createTaskDto });

    const newTask = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(ActiveTasks)
      .values([{
        user_id:user_id,
        title: createTaskDto.title ?? 'Untitled task',
        description: createTaskDto.description ?? ''
      }])
      .returning('*')
      .execute();

    console.log('Inserted task:', newTask.raw[0]);
    return newTask.raw[0];
  } catch (error) {
    console.error('Error creating task:', error);
    throw new HttpException('Failed to create task', HttpStatus.BAD_REQUEST);
  }
}
async findAllActiveTasks(user_id: number) {
  try {
    const tasks = await this.dataSource
      .createQueryBuilder(ActiveTasks, 'task')
      .select([
        'task.task_id',
        'task.title',
        'task.description',
        'task.completed',
        'task.createdAt',
        'task.user_id'
      ])
      .where('task.completed = :completed', { completed: false })
      .andWhere('task.user_id = :user_id', { user_id })
      .getMany();

    return tasks;
  } catch (error) {
    throw new HttpException('Failed to fetch all active tasks', 500);
  }
}


async updateActiveTask(id: number, dto: UpdateTaskDto) {
  try {
    const result = await this.dataSource
      .createQueryBuilder()
      .update(ActiveTasks)
      .set({
        title: dto.title,
        description: dto.description,
      })
      .where('task_id = :id', { id })
      .returning('*')
      .execute();

    if (!result.affected) {
      throw new NotFoundException(`Task ${id} not found`);
    }

    return result.raw[0];
  } catch {
    throw new HttpException('Task not updated', 400);
  }
}



 async deleteActiveTask(task_id: number, user_id: number) {
  try {
    const result = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(ActiveTasks)
      .where('task_id = :task_id AND user_id = :user_id', { task_id, user_id })
      .execute();

    if (!result.affected) {
      throw new NotFoundException(
        `Task ${task_id} not found for user ${user_id}`
      );
    }

    return { message: 'Task successfully deleted' };
  } catch {
    throw new HttpException('Task deletion failed', 500);
  }
}


  // === Completed Tasks ===



async addToCompletedTasks(task: CreateCompletedTaskDto, user_id: number) {
  try {
    const result = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(CompletedTasks)
      .values([
        {
          userId: user_id,          
          title: task.title,
          description: task.description, 
          completed: true,
          completedAt: new Date(),    
        },
      ])
      .returning('*')
      .execute();

    return result.raw[0]; 
  } catch (error) {
    console.error(error); 
    throw new HttpException(
      'Failed to add to completed tasks lists',
      HttpStatus.BAD_REQUEST,
    );
  }
}
  async findAllCompletedTasks() {
  try{
    const tasks = await this.dataSource
    .createQueryBuilder(CompletedTasks,'task')
    .select([
  'task.id',
  'task.title',
  'task.description',
  'task.completed',
  'task.completedAt',
  'task.user_id'
    ])
    .where('task.completed = :completed', { completed: true })
    .getMany();
    return tasks;
   }catch(error) {
    throw new HttpException('Failed to fetch all completed tasks',500)
   }
  }

async updateCompletedTask(id: number, title: string, description: string) {
  try {
    const result = await this.dataSource
      .createQueryBuilder()
      .update(CompletedTasks)
      .set({ title, description })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    if (!result.affected) {
      throw new NotFoundException(`Completed task ${id} not found`);
    }
    return result.raw[0];
  } catch {
    throw new HttpException('Completed task not updated', 400);
  }
}

async deleteCompletedTask(task_id:number, user_id:number) {
    try{
    const deletedTask = await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(CompletedTasks)
.where('id = :task_id AND user_id = :user_id', { task_id, user_id }) 
        .execute();
        if(deletedTask.affected === 0) {
          throw new NotFoundException(
            `Task with id ${task_id} not found for user ${user_id}`
          );
        }
        return {message: 'Task successfully deleted'};
    }catch(error) {
      throw new HttpException('Task deletion failed',500)
    } 
  }

}
