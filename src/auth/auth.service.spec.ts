import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await service.register('test@test.com', 'password');
    expect(result).toBe('User registered');
  });

  it('should login a user', async () => {
    const result = await service.login('test@test.com', 'password');
    expect(result).toBe('User logged in');
  });

  it('should logout a user', async () => {
    const result = await service.logout('token');
    expect(result).toBe('User logged out');
  });
});
