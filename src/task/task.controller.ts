import { Controller, Get, Post, Body, Param, Patch, Delete, Req, Query, UseGuards, UnauthorizedException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/jwt.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

@Post()
@UseGuards(JwtGuard)
async create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
  console.log('req.user:', req.user);
  console.log('DTO from body:', createTaskDto);

  const user_id = req.user?.id;
  if (!user_id) throw new UnauthorizedException('User not found in request');

  return await this.taskService.createTask(createTaskDto, user_id);
}

  @Get('active')
  // @UseGuards(JwtGuard)
  async findActiveTasks(@Req() req) {
    const user_id = req.user?.id;
    if (!user_id) throw new UnauthorizedException('User not found in request');
    return await this.taskService.findAllActiveTasks(user_id);
  }

  @Patch('active/update/:id')
  async updateActiveTask(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto
  ) {
    return await this.taskService.updateActiveTask(id, dto);
  }

  @Delete('active/delete/:taskId/:userId')
  async deleteActiveTask(
    @Param('taskId') task_id: number,
    @Param('userId') user_id: number,
  ) {
    return await this.taskService.deleteActiveTask(task_id, user_id);
  };

@Post('/completed/:userId/:taskId') 
async newCompletedTask (
@Param('task_id') task_id:number,
@Param('user_id') user_id:number
) {
  return await this.taskService.sendToCompletedTask(user_id,task_id)
}

  @Get('completed/find')
  async findCompletedTasks() {
    return await this.taskService.findAllCompletedTasks();
  };

  @Patch('completed/update/:id')
async updateCompletedTask(
  @Param('id') id: number,
  @Param('title') title:string,
  @Param('description') description:string
) {
   return await this.taskService.updateCompletedTask(id,title,description);
  }

  @Delete('completed/delete/:taskId/:userId')
  async deleteCompletedTask(
    @Param('task_id') task_id: number,
    @Param('user_id') user_id: number
  ) {
    return await this.taskService.deleteCompletedTask(task_id, user_id);
  }
}
