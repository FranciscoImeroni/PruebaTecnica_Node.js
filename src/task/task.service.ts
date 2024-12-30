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

  async searchTasks(query: string): Promise<Task[]> {
    return this.taskModel
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }

  async filterTasks(
    status?: TaskStatus,
    dueDate?: Date,
    assignedUser?: string,
  ): Promise<Task[]> {
    const filters: any = {};

    if (status) filters.status = status;
    if (dueDate) filters.dueDate = { $lte: dueDate };
    if (assignedUser) filters.assignedUser = assignedUser;

    return this.taskModel.find(filters).exec();
  }


  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
