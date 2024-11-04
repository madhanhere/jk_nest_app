import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { Users } from '../../users/entity/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersRepository: Repository<Users>;

  const mockUsersRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockProfile = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    picture: 'profile.jpg',
    provider: 'google',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateOAuthLogin', () => {
    it('should create a new user and return the user info with access token', async () => {
      const newUser = { ...mockProfile, accountId: mockProfile.id };
      const savedUser = { ...newUser, id: '1' };

      // Mock the user repository methods
      mockUsersRepository.findOne.mockResolvedValue(null); // Simulate user not found
      mockUsersRepository.create.mockReturnValue(newUser);
      mockUsersRepository.save.mockResolvedValue(savedUser);
      mockJwtService.sign.mockReturnValue('accessToken');

      const result = await service.validateOAuthLogin(mockProfile);
      expect(result).toEqual({
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        picture: savedUser.picture,
        id: savedUser.id,
        email: savedUser.email,
        accessToken: 'accessToken',
      });
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({ where: { email: mockProfile.email } });
      expect(mockUsersRepository.save).toHaveBeenCalledWith(newUser);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: savedUser.email,
        id: savedUser.id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        picture: savedUser.picture,
      });
    });

    it('should return existing user info with access token if user already exists', async () => {
      const existingUser = { id: '1', ...mockProfile };

      // Mock the user repository methods
      mockUsersRepository.findOne.mockResolvedValue(existingUser);
      mockJwtService.sign.mockReturnValue('accessToken');

      const result = await service.validateOAuthLogin(mockProfile);
      expect(result).toEqual({
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        picture: existingUser.picture,
        id: existingUser.id,
        email: existingUser.email,
        accessToken: 'accessToken',
      });
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({ where: { email: mockProfile.email } });
      expect(mockUsersRepository.create).not.toHaveBeenCalled(); // Ensure create was not called
      expect(mockUsersRepository.save).not.toHaveBeenCalled(); // Ensure save was not called
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: existingUser.email,
        id: existingUser.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        picture: existingUser.picture,
      });
    });
  });

  describe('IsUserExist', () => {
    it('should return true if user exists', async () => {
      mockUsersRepository.findOne.mockResolvedValue({ id: '1', email: 'johndoe@example.com' });

      const result = await service.IsUserExist('johndoe@example.com');
      expect(result).toBe(true);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({ where: { email: 'johndoe@example.com' } });
    });

    it('should return false if user does not exist', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      const result = await service.IsUserExist('nonexistent@example.com');
      expect(result).toBe(false);
      expect(mockUsersRepository.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
    });
  });
});
