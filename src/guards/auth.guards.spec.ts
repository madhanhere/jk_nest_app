import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service'; // Update this path based on your project structure
import { ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from './auth.guards';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;
  let usersService: UsersService;

  const mockUser = { id: '1', isDeleted: false }; // Mock user object
  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer validToken',
        },
      }),
    }),
  } as unknown as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    it('should return true for a valid token and existing user', async () => {
      // Arrange
      const validTokenPayload = { id: '1' };
      jwtService.verifyAsync = jest.fn().mockResolvedValue(validTokenPayload);
      usersService.findUserById = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await guard.canActivate(mockExecutionContext);

      // Assert
      expect(result).toBe(true);
      expect(mockExecutionContext.switchToHttp().getRequest().user).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if token is not present', async () => {
      // Arrange
      const contextWithoutToken = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({
            headers: {},
          }),
        }),
      } as unknown as ExecutionContext;

      // Act & Assert
      await expect(guard.canActivate(contextWithoutToken)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      // Arrange
      jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error('Invalid token'));

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(UnauthorizedException);
    });
  });
});
