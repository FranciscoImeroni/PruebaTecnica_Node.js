import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { Project } from '../schemas/project.schema';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Projects') // Etiqueta para agrupar los endpoints de proyectos
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear Proyecto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        users: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  async createProject(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('users') users: string[],
  ): Promise<Project> {
    return this.projectsService.createProject(name, description, users);
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  async getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del proyecto' })
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        users: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  async updateProject(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('users') users: string[],
  ): Promise<Project> {
    return this.projectsService.updateProject(id, name, description, users);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del proyecto' })
  async deleteProject(@Param('id') id: string): Promise<Project> {
    return this.projectsService.deleteProject(id);
  }
}
