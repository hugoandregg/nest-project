import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma.service';
import { requireAuth } from 'src/middleware/auth.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(requireAuth) // Apply the requireAuth middleware
      .forRoutes('/users'); // Apply the middleware to all routes in the module
  }
}
