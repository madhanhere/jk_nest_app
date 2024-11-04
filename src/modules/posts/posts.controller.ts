import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator';
import { PostsService } from './posts.services';
import { PostDTO } from './dto/AddPostDTO';
import { Posts } from './entity/post.entity';
import { AuthGuard } from '@auths/auth.guards';
import { PaginationDTO } from './dto/PaginationDTO';
import { IPostList } from '@interface/postList';


@ApiTags('posts')
@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) {}

    @UseGuards(AuthGuard)
    @Post('/create')
    async create(
        @User() user,
        @Body() body: PostDTO
    ): Promise<Posts> {
        return this.postsService.createPost(user, body);
    }

    @Get(':id')
    async getPost(@Param('id') id: string): Promise<Posts> {
        return this.postsService.postDetails(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async updatePost(@Param('id') id, @Body() body: PostDTO): Promise<Posts> {
        return this.postsService.editPost(id, body);
    }

    @UseGuards(AuthGuard)
    @Get('')
    async getPosts(@Query() paginationDTO: PaginationDTO): Promise<IPostList> {
        return this.postsService.list(paginationDTO);
    }
}
