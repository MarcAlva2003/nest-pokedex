import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Limpia los campos no requeridos/no deseados
      forbidNonWhitelisted: true, // No permite que se envíen datos no requeridos/no deseados
      // transform: false,
      transformOptions: {
        exposeUnsetFields: false,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
