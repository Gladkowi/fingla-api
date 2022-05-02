import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigModule } from './services/config/config.module';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(ConfigModule).get(ConfigService);
  if (configService.get('db.cli.onlyExportConfig')) {
    await configService.exportTypeOrmConfig();
    console.log(
      `Exported TypeOrm config as ${configService.get('db.cli.exportPath')}`
    );
    process.exit();
  }
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://192.168.1.49:3000', 'http://localhost:3000', 'http://192.168.1.33:3000'],
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
  await app.listen(configService.get('port'));
}

bootstrap();
