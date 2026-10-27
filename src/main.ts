import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 ~ Lanzando el servidor en el puerto: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
