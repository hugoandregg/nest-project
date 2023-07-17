import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/services/prisma.service';
import { requireAuth } from 'src/middleware/auth.middleware';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(requireAuth) // Apply the requireAuth middleware
      .forRoutes('/posts'); // Apply the middleware to all routes in the module
  }
}
