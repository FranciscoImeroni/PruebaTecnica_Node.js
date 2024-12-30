import { Controller, Post, Get, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { TasksService } from './task.service';
import { Task, TaskStatus } from '../schemas/task.schema';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Tasks') // Etiqueta para agrupar los endpoints de tareas
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una tarea' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        project: { type: 'string' },
        assignedUser: { type: 'string' },
        status: { type: 'string', enum: Object.values(TaskStatus) },
        dueDate: { type: 'string', format: 'date-time' },
      },
    },
  })
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
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  async getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar tarea' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: Object.values(TaskStatus) },
      },
    },
  })
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar tareas' })
  @ApiQuery({ name: 'query', type: 'string', description: 'Palabra clave para buscar tareas' })
  async searchTasks(@Query('query') query: string): Promise<Task[]> {
    return this.tasksService.searchTasks(query);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtrar tareas' })
  @ApiQuery({ name: 'status', type: 'string', enum: ['TODO', 'IN_PROGRESS', 'DONE'], required: false })
  @ApiQuery({ name: 'dueDate', type: 'string', format: 'date-time', required: false })
  @ApiQuery({ name: 'assignedUser', type: 'string', required: false })
  async filterTasks(
    @Query('status') status?: TaskStatus,
    @Query('dueDate') dueDate?: string,
    @Query('assignedUser') assignedUser?: string,
  ): Promise<Task[]> {
    if (dueDate) dueDate = new Date(dueDate).toISOString();
    return this.tasksService.filterTasks(status, dueDate ? new Date(dueDate) : undefined, assignedUser);
  }
}
