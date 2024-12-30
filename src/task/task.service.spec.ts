import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task, TaskStatus } from '../schemas/task.schema';
import { Model } from 'mongoose';

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: {
            new: jest.fn().mockResolvedValue({
              save: jest.fn().mockResolvedValue({}),
            }),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken('Task'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const result = await service.createTask('Task 1', 'Description', '1', 'user1', TaskStatus.PENDING, new Date());
    expect(result).toEqual({});
    expect(model.prototype.save).toHaveBeenCalled();
  });

  it('should return all tasks', async () => {
    const result = await service.getTasks();
    expect(result).toEqual([]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should update a task status', async () => {
    const result = await service.updateTaskStatus('1', TaskStatus.IN_PROGRESS);
    expect(result).toEqual({});
    expect(model.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should delete a task', async () => {
    const result = await service.deleteTask('1');
    expect(result).toEqual({});
    expect(model.findByIdAndDelete).toHaveBeenCalled();
  });
});
