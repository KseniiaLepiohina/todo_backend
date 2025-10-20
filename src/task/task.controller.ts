import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get('active/:userID')
  async findActiveTasks(@Param('userId') userId: number) {
    return await this.taskService.findAllActiveTasks(userId);
  }
  @Patch('active/update')
  async updateActiveTask(@Param()) {
    return await this.taskService.updateActiveTask(id, updateActiveTaskDto)
  }
  @Post('active/delete')
  async deleteActiveTask(){
    return await this.taskService.deleteActiveTask()
  };


  

@Get('completed/find')
async findCompletedTasks() {
  return await this.taskService.findAllCompletedTasks
};
@Patch('completed/updateCompletedTask') 
async updateCompletedTask() {
  return await this.taskService.updateCompletedTask(this.updateCompletedTask)
}
}
