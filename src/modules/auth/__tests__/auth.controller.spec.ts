import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from "../auth.service";
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUser: any = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    picture: 'profile.jpg',
    provider: 'google',
  };

  const mockAuthService = {
    validateOAuthLogin: jest.fn(),
  };

  const mockResponse = {
    send: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(AuthGuard('google')) // Override AuthGuard for google
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .overrideGuard(AuthGuard('facebook')) // Override AuthGuard for facebook
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('googleAuthRedirect', () => {
    it('should validate user and return response', async () => {
      const mockRequest = { user: mockUser } as Request;
      const expectedResponse = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        picture: mockUser.picture,
        id: mockUser.id,
        email: mockUser.email,
        accessToken: 'accessToken',
      };

      mockAuthService.validateOAuthLogin.mockResolvedValue(expectedResponse);

      const result = await controller.googleAuthRedirect(mockRequest, mockResponse);
      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.validateOAuthLogin).toHaveBeenCalledWith(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      const mockRequest = { user: null } as Request;

      await expect(controller.googleAuthRedirect(mockRequest, mockResponse)).rejects.toThrowError(
        new Error('user not found'),
      );
    });
  });

  describe('facebookLoginRedirect', () => {
    it('should validate user and return response', async () => {
      const mockRequest = { user: mockUser } as Request;
      const expectedResponse = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        picture: mockUser.picture,
        id: mockUser.id,
        email: mockUser.email,
        accessToken: 'accessToken',
      };

      mockAuthService.validateOAuthLogin.mockResolvedValue(expectedResponse);

      const result = await controller.facebookLoginRedirect(mockRequest);
      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.validateOAuthLogin).toHaveBeenCalledWith(mockUser);
    });

    it('should throw an error if user is not found', async () => {
      const mockRequest = { user: null } as Request;

      await expect(controller.facebookLoginRedirect(mockRequest)).rejects.toThrowError(
        new Error('user not found'),
      );
    });
  });
});
