import { Users } from '../../users/entity/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PostDTO } from '../dto/AddPostDTO';
import { PaginationDTO } from '../dto/PaginationDTO';
import { Posts } from '../entity/post.entity';
import { PostsService } from '../posts.services';


describe('PostsService', () => {
  let service: PostsService;
  let postsRepository: Repository<Posts>;

  const mockPostsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
  };

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue({
      manager: {
        update: jest.fn(),
      },
    }),
  };

  const mockUser: Users = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    // Add other necessary user properties
  } as unknown as Users;

  const mockPostDTO: PostDTO = {
    title: 'Test Title',
    content: 'Test Content',
  };

  const mockPost: Posts = {
    id: '1',
    user: mockUser,
    title: mockPostDTO.title,
    content: mockPostDTO.content,
    // Add other necessary post properties
  } as unknown as Posts;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Posts),
          useValue: mockPostsRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postsRepository = module.get<Repository<Posts>>(getRepositoryToken(Posts));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create and save a post', async () => {
      mockPostsRepository.create.mockReturnValue(mockPost);
      mockPostsRepository.save.mockResolvedValue(mockPost);

      await service.createPost(mockUser, mockPostDTO);

      expect(postsRepository.create).toHaveBeenCalledWith({
        user: mockUser,
        title: mockPostDTO.title,
        content: mockPostDTO.content,
      });
      expect(postsRepository.save).toHaveBeenCalledWith(mockPost);
    //   expect(result).toEqual(mockPost);
    });
  });

  describe('editPost', () => {
    it('should update a post and return its details', async () => {
      const postId = '1';
      const updatedPost = { ...mockPost, title: 'Updated Title' };

      mockPostsRepository.findOne.mockResolvedValue(updatedPost);
      mockDataSource.createQueryRunner().manager.update.mockResolvedValue({ affected: 1 });

      const result = await service.editPost(postId, { title: 'Updated Title', content: 'Updated Content' });

      expect(mockDataSource.createQueryRunner().manager.update).toHaveBeenCalledWith(Posts, postId, {
        title: 'Updated Title',
        content: 'Updated Content',
      });
      expect(result).toEqual(updatedPost);
    });
  });

  describe('postDetails', () => {
    it('should return post details', async () => {
      const postId = '1';
      mockPostsRepository.findOne.mockResolvedValue(mockPost);

      const result = await service.postDetails(postId);

      expect(postsRepository.findOne).toHaveBeenCalledWith({ where: { id: postId } });
      expect(result).toEqual(mockPost);
    });
  });

  describe('list', () => {
    it('should return a paginated list of posts', async () => {
      const paginationDto: PaginationDTO = { page: 1, limit: 10 };
      mockPostsRepository.findAndCount.mockResolvedValue([[mockPost], 1]);

      const result = await service.list(paginationDto);

      expect(postsRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        posts: [mockPost],
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
      });
    });
  });
});
