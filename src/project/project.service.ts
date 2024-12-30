import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}

  async createProject(name: string, description: string, users: string[]): Promise<Project> {
    const newProject = new this.projectModel({ name, description, users });
    try {
      const savedProject = await newProject.save();
      return savedProject;
    } catch (error) {
      throw new Error('Error al guardar el proyecto');
    }
  }
  


  async getProjects(): Promise<Project[]> {
    return this.projectModel.find().populate('users').exec();
  }

  async getProjectById(id: string): Promise<Project> {
    return this.projectModel.findById(id).populate('users').exec();
  }

  async updateProject(id: string, name: string, description: string, users: string[]): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, { name, description, users }, { new: true }).exec();
  }

  async deleteProject(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
  
}
