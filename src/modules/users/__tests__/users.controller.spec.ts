import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    getUserAccount: jest.fn(),
    findUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        JwtService
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const mockUser = {
    id: '1',
    lastName: 'John Doe',
    email: 'johndoe@example.com',
    firstName: 'Jhon',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "",
    picture: "",
    provider: ""
  };

  describe('getUserProfile', () => {
    it('should return the logged-in user profile', async () => {
      mockUsersService.getUserAccount.mockResolvedValue(mockUser);

      const result = await controller.getUserProfile(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUsersService.getUserAccount).toHaveBeenCalledWith(mockUser);
    });
  });
});
