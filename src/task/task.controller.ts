import { Controller, Get, Post, Body, Param, Patch, Delete, Req, Query, UseGuards, UnauthorizedException, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtGuard } from 'src/jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ActiveTasks } from './entities/ActiveTasks.entity';
import { CreateCompletedTaskDto } from './dto/create-completed-task.dto';

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
  @UseGuards(JwtGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Retrieve all active tasks for the logged-in user' })
  async findActiveTasks(@Req() req) {
    const user_id = req.user?.id;
    if (!user_id) throw new UnauthorizedException('User not found in request');
    return await this.taskService.findAllActiveTasks(user_id);
  }

  @ApiBearerAuth('token')
  @Patch('active/update/:id')
  @UseGuards(JwtGuard)
  async updateActiveTask(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto
  ) {
    return await this.taskService.updateActiveTask(id, dto);
  }

  @ApiBearerAuth('token')
  @Delete('active/delete/:taskId')
  @UseGuards(JwtGuard)
  async deleteActiveTask(
    @Param('taskId') task_id: number,
    @Param('userId') user_id: number,
  ) {
    return await this.taskService.deleteActiveTask(task_id, user_id);
  };

  @ApiBearerAuth('token')
  @Get('completed/find')
  @UseGuards(JwtGuard)
  async findCompletedTasks() {
    return await this.taskService.findAllCompletedTasks();
  };

  @ApiBearerAuth('token')
  @Patch('completed/update/:id')
  @UseGuards(JwtGuard)
  async updateCompletedTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto
  ) {
    if (!dto.title || !dto.description) {
      throw new UnauthorizedException('Title and description are required');
    }
    return await this.taskService.updateCompletedTask(id, dto.title, dto.description);
  }

  @ApiBearerAuth('token')
  @Delete('completed/delete/:taskId/:userId')
  @UseGuards(JwtGuard)
  async deleteCompletedTask(
    @Param('taskId', ParseIntPipe) task_id: number, // Ім'я має збігатися з :taskId
    @Param('userId', ParseIntPipe) user_id: number  // Ім'я має збігатися з :userId
  ) {
    return this.taskService.deleteCompletedTask(task_id, user_id);
  }

}
