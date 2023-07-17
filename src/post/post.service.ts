import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async createPost(post: PostDto): Promise<Post> {
    return await this.prismaService.prisma.post.create({ data: post });
  }

  async getPostById(id: number): Promise<Post> {
    return await this.prismaService.prisma.post.findFirst({ where: { id } });
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.prismaService.prisma.post.findMany();
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
