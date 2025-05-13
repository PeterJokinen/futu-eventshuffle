import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 3000
  Logger.log("Starting at port " + port)
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
