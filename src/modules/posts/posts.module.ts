import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { Posts } from './entity/post.entity';
import { PostsService } from './posts.services';
import { UsersModule } from '@modules/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ Posts ]),
        UsersModule
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule {}
