import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn().mockResolvedValue('User registered'),
      login: jest.fn().mockResolvedValue('User logged in'),
      logout: jest.fn().mockResolvedValue('User logged out'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await controller.register('test@test.com', 'password');
    expect(result).toBe('User registered');
  });

  it('should login a user', async () => {
    const result = await controller.login('test@test.com', 'password');
    expect(result).toBe('User logged in');
  });

  it('should logout a user', async () => {
    const result = await controller.logout('token');
    expect(result).toBe('User logged out');
  });
});
