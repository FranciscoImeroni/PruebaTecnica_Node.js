import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskStatus } from '../schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>
) {}

  async createTask(
    name: string,
    description: string,
    project: string,
    assignedUser: string,
    status: TaskStatus,
    dueDate: Date,
  ): Promise<Task> {
    const newTask = new this.taskModel({ name, description, project, assignedUser, status, dueDate });
    return newTask.save();
  }

  async getTasks(): Promise<Task[]> {
    return this.taskModel.find().populate('project assignedUser').exec();
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
