import { Inject, Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { PostDto } from './dto/post.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async createPost(post: PostDto): Promise<Post> {
    return await this.prismaService.prisma.post.create({ data: post });
  }

  async getPostById(id: number): Promise<Post> {
    return await this.prismaService.prisma.post.findFirst({ where: { id } });
  }

  async getAllPosts(): Promise<Post[]> {
    const cachedData = await this.cacheService.get<Post[]>('all_posts');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }
    const posts = await this.prismaService.prisma.post.findMany();
    await this.cacheService.set('all_posts', posts);
    return posts;
  }

  async updatePost(id: number, post: PostDto): Promise<Post> {
    return await this.prismaService.prisma.post.update({
      where: { id },
      data: post,
    });
  }

  async deletePost(id: number): Promise<Post> {
    return await this.prismaService.prisma.post.delete({
      where: { id },
    });
  }
}
