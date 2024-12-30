import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './project.service';
import { Project } from '../schemas/project.schema';
import { error } from 'console';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('users') users: string[],
  ): Promise<Project> {
    return this.projectsService.createProject(name, description, users);
  }

  @Get()
  async getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('users') users: string[],
  ): Promise<Project> {
    return this.projectsService.updateProject(id, name, description, users);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<Project> {
    return this.projectsService.deleteProject(id);
  }
}
