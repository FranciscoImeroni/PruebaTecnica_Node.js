import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { TasksService } from './task.service';
import { Task, TaskStatus } from '../schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('project') project: string,
    @Body('assignedUser') assignedUser: string,
    @Body('status') status: TaskStatus,
    @Body('dueDate') dueDate: Date,
  ): Promise<Task> {
    return this.tasksService.createTask(name, description, project, assignedUser, status, dueDate);
  }

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}
