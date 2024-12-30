import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './project.controller';
import { ProjectsService } from './project.service';
import { Project } from '../schemas/project.schema';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            createProject: jest.fn(),
            getProjects: jest.fn(),
            getProjectById: jest.fn(),
            updateProject: jest.fn(),
            deleteProject: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a project', async () => {
    const result: Project = { 
      _id: '1', // Mock the _id
      name: 'Project 1', 
      description: 'Description', 
      users: ['user1']
    } as any; // Cast to 'any' if necessary
  
    jest.spyOn(service, 'createProject').mockResolvedValue(result);
  
    expect(await controller.createProject('Project 1', 'Description', ['user1'])).toEqual(result);
  });
  

  it('should get all projects', async () => {
    const result: Project[] = [];
    jest.spyOn(service, 'getProjects').mockResolvedValue(result);

    expect(await controller.getProjects()).toEqual(result);
  });

  it('should get a project by ID', async () => {
    const result: Project = { 
      _id: '1', // Mock the _id
      name: 'Project 1', 
      description: 'Description', 
      users: ['user1']
    } as any; // Cast to 'any' if necessary
  
    jest.spyOn(service, 'getProjectById').mockResolvedValue(result);
  
    expect(await controller.getProjectById('1')).toEqual(result);
  });
  
  it('should update a project', async () => {
    const result: Project = { 
      _id: '1', // Mock the _id
      name: 'Updated Project', 
      description: 'Updated Description', 
      users: ['user2']
    } as any; // Cast to 'any' if necessary
  
    jest.spyOn(service, 'updateProject').mockResolvedValue(result);
  
    expect(await controller.updateProject('1', 'Updated Project', 'Updated Description', ['user2'])).toEqual(result);
  });
  
  it('should delete a project', async () => {
    const result: Project = { 
      _id: '1', // Mock the _id
      name: 'Project 1', 
      description: 'Description', 
      users: ['user1']
    } as any; // Cast to 'any' if necessary
  
    jest.spyOn(service, 'deleteProject').mockResolvedValue(result);
  
    expect(await controller.deleteProject('1')).toEqual(result);
  });
  
});
