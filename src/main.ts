import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'I-will-tell-you-a-secret-at-midnight',
      resave: false,
      saveUninitialized: false,
    }),
  );

  const seedService = app.get(SeedService);
  await seedService.seed();

  await app.listen(3000);
}
bootstrap();
