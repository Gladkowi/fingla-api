import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigModule } from './services/config/config.module';
import { ConfigService } from './services/config/config.service';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/http.filter';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthAdapter } from './adapter/auth.adapter';

async function bootstrap() {
  const configApp = await NestFactory.create(ConfigModule);
  const configService = configApp.select(ConfigModule).get(ConfigService);
  if (configService.get('db.cli.onlyExportConfig')) {
    await configService.exportTypeOrmConfig();
    console.log(
      `Exported TypeOrm config as ${configService.get('db.cli.exportPath')}`
    );
    process.exit();
  }
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://192.168.1.41:3000',
      'http://localhost:3000',
      'http://192.168.1.33:3000',
      'http://192.168.1.33',
      'ws://192.168.1.33'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const config = new DocumentBuilder()
  .setTitle('Fingla API')
  .setDescription('Fingla is a finance application for users')
  .setVersion('0.2.1')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('swagger.ui_path'), app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'storage'), {
    prefix: '/storage'
  });
  app.useWebSocketAdapter(new AuthAdapter(app));
  await app.listen(configService.get('port'));
}

bootstrap();
