import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { Task, TaskStatus } from '../schemas/task.schema';
import { Types } from 'mongoose';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn(),
            getTasks: jest.fn(),
            updateTaskStatus: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const result: Partial<Task> = {
      _id: new Types.ObjectId(), 
      name: 'Task 1',
      description: 'Description',
      project: new Types.ObjectId('60d21b4667d0d8992e610c85'), 
      assignedUser: new Types.ObjectId('60d21b4667d0d8992e610c86'), 
      status: TaskStatus.PENDING, 
      dueDate: new Date(),
      createdAt: new Date(), 
    };

    jest.spyOn(service, 'createTask').mockResolvedValue(result as Task); 

    expect(await controller.createTask('Task 1', 'Description', '1', 'user1', TaskStatus.PENDING, new Date())).toEqual(result);
  });

  it('should get all tasks', async () => {
    const result: Task[] = [];
    jest.spyOn(service, 'getTasks').mockResolvedValue(result);

    expect(await controller.getTasks()).toEqual(result);
  });

  it('should update task status', async () => {
    const result: Partial<Task> = {
      _id: new Types.ObjectId(), 
      name: 'Task 1',
      description: 'Description',
      project: new Types.ObjectId('60d21b4667d0d8992e610c85'), 
      assignedUser: new Types.ObjectId('60d21b4667d0d8992e610c86'), 
      status: TaskStatus.IN_PROGRESS,
      dueDate: new Date(),
      createdAt: new Date(),
    };

    jest.spyOn(service, 'updateTaskStatus').mockResolvedValue(result as Task);

    expect(await controller.updateTaskStatus('1', TaskStatus.IN_PROGRESS)).toEqual(result);
  });

  it('should delete a task', async () => {
    const result: Partial<Task> = {
      _id: new Types.ObjectId(), 
      name: 'Task 1',
      description: 'Description',
      project: new Types.ObjectId('60d21b4667d0d8992e610c85'),
      assignedUser: new Types.ObjectId('60d21b4667d0d8992e610c86'),
      status: TaskStatus.PENDING, 
      dueDate: new Date(),
      createdAt: new Date(), 
    };

    jest.spyOn(service, 'deleteTask').mockResolvedValue(result as Task); 

    expect(await controller.deleteTask('1')).toEqual(result);
  });
});
