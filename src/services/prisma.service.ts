import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}
