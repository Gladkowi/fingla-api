import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: ['http://localhost:3000','http://192.168.1.33:3000'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});
	const config = new DocumentBuilder()
		.setTitle('Fingla API')
		.setVersion('0.0.2')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
	await app.listen(5000);
}
bootstrap();
