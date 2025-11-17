import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 1. Importe o ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 3. (NOVO) Diga ao backend para aceitar chamadas de outros 'vizinhos'
  app.enableCors();

  // 2. Diga ao NestJS para usar o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão no DTO
      forbidNonWhitelisted: true, // Lança um erro se campos extra forem enviados
      transform: true, // Transforma os dados de entrada para os tipos do DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();