import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../entity/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersRepository: Repository<Users>;

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

  const mockUsersRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserById', () => {
    let result: any;
    beforeEach(async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);
      result = await service.findUserById('1');
    });

    it('should return the user if found', async () => {
      result = await service.findUserById('1');
      expect(result).toEqual(mockUser);
    });

    it('should call where with `id` as `1` and called `relations` the user if found', async () => {
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['posts'],
      });
    });
  });

  describe('getUserAccount', () => {
    it('should return user details if user is found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserAccount(mockUser);
      expect(result).toEqual(mockUser);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should return null if user is not found', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      const result = await service.getUserAccount(mockUser);
      expect(result).toBeNull();
    });
  });
});
