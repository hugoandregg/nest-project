import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(private readonly prismaService: PrismaService) {}

  async seedUsers() {
    const password = await bcrypt.hash('password', 10);
    const users = [
      { name: 'User 1', email: 'user1@example.com', password },
      { name: 'User 2', email: 'user2@example.com', password },
      { name: 'User 3', email: 'user3@example.com', password },
      { name: 'User 4', email: 'user4@example.com', password },
      { name: 'User 5', email: 'user5@example.com', password },
    ];

    for (const user of users) {
      await this.prismaService.prisma.user.create({ data: user });
    }
  }

  async seedPosts() {
    for (let i = 1; i <= 30000; i++) {
      const post = {
        title: `Post ${i}`,
        content: `Content ${i}`,
        userId: (i % 5) + 1,
      };
      await this.prismaService.prisma.post.create({ data: post });
    }
  }

  async seed() {
    try {
      //await this.seedUsers();
      // await this.seedPosts();
      console.log('Seed completed successfully.');
    } catch (error) {
      console.error('Error occurred during seed:', error);
    }
  }
}
