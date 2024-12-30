import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './project.service';
import { getModelToken } from '@nestjs/mongoose';
import { Project } from '../schemas/project.schema';
import { Model } from 'mongoose';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let model: Model<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken('Project'),
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

    service = module.get<ProjectsService>(ProjectsService);
    model = module.get<Model<Project>>(getModelToken('Project'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const result = await service.createProject('Project 1', 'Description', ['user1']);
    expect(result).toEqual({});
    expect(model.prototype.save).toHaveBeenCalled();
  });

  it('should return all projects', async () => {
    const result = await service.getProjects();
    expect(result).toEqual([]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return a project by ID', async () => {
    const result = await service.getProjectById('1');
    expect(result).toEqual({});
    expect(model.findById).toHaveBeenCalled();
  });

  it('should update a project', async () => {
    const result = await service.updateProject('1', 'Updated Project', 'Updated Description', ['user2']);
    expect(result).toEqual({});
    expect(model.findByIdAndUpdate).toHaveBeenCalled();
  });

  it('should delete a project', async () => {
    const result = await service.deleteProject('1');
    expect(result).toEqual({});
    expect(model.findByIdAndDelete).toHaveBeenCalled();
  });
});
