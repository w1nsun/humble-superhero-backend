import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors({ origin: true, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Humble Superhero API')
    .setDescription('eJam backend coding assignment')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
