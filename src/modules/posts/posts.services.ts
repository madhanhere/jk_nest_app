import { Users } from '../users/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';
import { PostDTO } from './dto/AddPostDTO';
import { Posts } from './entity/post.entity';
import { PaginationDTO } from './dto/PaginationDTO';
import { IPostList } from '@interface/postList';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Posts) private postsRepository: Repository<Posts>,
        private dataSource: DataSource,
    ) {}

    async createPost(user: Users, addPostDto: PostDTO): Promise<Posts> {
        const post = this.postsRepository.create({
            user: user,
            title: addPostDto.title,
            content: addPostDto.content
        });

        const data = await this.postsRepository.save(post);
        return plainToClass(Posts, data);
    }

    async editPost(postId: string, postDto: PostDTO): Promise<Posts> {
        const query = this.dataSource.createQueryRunner();

        await query.manager.update(Posts, postId, {
            title: postDto.title, content: postDto.content
        });
        return await this.postDetails(postId);
    }
    
    async postDetails(postId): Promise<Posts> {
        return await this.postsRepository.findOne({ where: { id: postId }, relations: ['user'] });
    }

    async list(paginationDto: PaginationDTO): Promise<IPostList> {
        
        const page = paginationDto.page ?? 1;
        const limit = paginationDto.limit ?? 5;

        const [items, totalItems] = await this.postsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['user'],
            order: {
                "createdAt": "desc"
            }
          });

          return {
            posts: items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
          };
    }
    
}