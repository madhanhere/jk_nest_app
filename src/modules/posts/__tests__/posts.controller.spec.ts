import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.services';
import { PostDTO } from '../dto/AddPostDTO';
import { Posts } from '../entity/post.entity';
import { IPostList } from '@interface/postList';
import { PaginationDTO } from '../dto/PaginationDTO';


jest.mock('./posts.service'); // Automatically mocks the PostsService

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockUser = { id: '1', firstName: 'John', lastName: 'Doe' }; // Mock user object
  const mockPostDTO: PostDTO = { title: 'Test Title', content: 'Test Content' }; // Mock PostDTO
  const mockPost: Posts = {
    id: '1',
    user: mockUser,
    title: mockPostDTO.title,
    content: mockPostDTO.content,
    // Add other necessary properties
  } as Posts;

  const mockPostList: IPostList = {
    posts: [mockPost],
    totalItems: 1,
    totalPages: 1,
    currentPage: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            createPost: jest.fn().mockResolvedValue(mockPost),
            postDetails: jest.fn().mockResolvedValue(mockPost),
            editPost: jest.fn().mockResolvedValue(mockPost),
            list: jest.fn().mockResolvedValue(mockPostList),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const result = await controller.create(mockUser, mockPostDTO);

      expect(service.createPost).toHaveBeenCalledWith(mockUser, mockPostDTO);
      expect(result).toEqual(mockPost);
    });
  });

  describe('getPost', () => {
    it('should return a post by ID', async () => {
      const result = await controller.getPost('1');

      expect(service.postDetails).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const result = await controller.updatePost('1', mockPostDTO);

      expect(service.editPost).toHaveBeenCalledWith('1', mockPostDTO);
      expect(result).toEqual(mockPost);
    });
  });

  describe('getPosts', () => {
    it('should return a list of posts', async () => {
      const paginationDTO: PaginationDTO = { page: 1, limit: 10 };
      const result = await controller.getPosts(paginationDTO);

      expect(service.list).toHaveBeenCalledWith(paginationDTO);
      expect(result).toEqual(mockPostList);
    });
  });
});
