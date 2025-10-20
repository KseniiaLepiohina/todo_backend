import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveTasks } from './entities/ActiveTasks.entity';
import { CompletedTasks } from './entities/CompletedTasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(ActiveTasks)
    private ActiveTasksRepository: Repository<ActiveTasks>,

    @InjectRepository(CompletedTasks)
    private CompletedTasksRepository: Repository<CompletedTasks>,
  ) {}

  // === Active Tasks ===
  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = this.ActiveTasksRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      user: { id: createTaskDto.userId } as any, // прив’язка по id
    });

    return await this.ActiveTasksRepository.save(newTask);
  }

  async findAllActiveTasks() {
    const activeTasks = await this.ActiveTasksRepository.find({
      where: { status: 'active' },
      relations: ['user'],
    });

    if (!activeTasks.length) {
      throw new HttpException('Active tasks not found', HttpStatus.NOT_FOUND);
    }

    return activeTasks;
  }

  async updateActiveTask(id: number, updateActiveTaskDto: UpdateTaskDto) {
    const task = await this.ActiveTasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(task, updateActiveTaskDto);
    return await this.ActiveTasksRepository.save(task);
  }

  async deleteActiveTask(id: number) {
    const task = await this.ActiveTasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return await this.ActiveTasksRepository.remove(task);
  }

  // === Completed Tasks ===
  async findAllCompletedTasks() {
    const completedTasks = await this.CompletedTasksRepository.find({
      where: { status: 'completed' },
      relations: ['user'],
    });

    if (!completedTasks.length) {
      throw new HttpException(
        'Completed tasks not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return completedTasks;
  }

  async updateCompletedTask(id: number, updateCompletedTaskDto: UpdateTaskDto) {
    const task = await this.CompletedTasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(task, updateCompletedTaskDto);
    return await this.CompletedTasksRepository.save(task);
  }

  async deleteCompletedTask(id: number) {
    const task = await this.CompletedTasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return await this.CompletedTasksRepository.remove(task);
  }
}
