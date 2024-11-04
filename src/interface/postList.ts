import { Posts } from '@modules/posts/entity/post.entity';
export interface IPostList {
    posts: Posts[],
    totalItems: number,
    totalPages: number,
    currentPage: number
}