import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: UserDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.prismaService.prisma.user.create({ data: user });
  }

  async getUserById(id: number): Promise<User> {
    return await this.prismaService.prisma.user.findFirst({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.prisma.user.findMany();
  }

  async updateUser(id: number, user: UserDto): Promise<User> {
    return await this.prismaService.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prismaService.prisma.user.delete({
      where: { id },
    });
  }
}
