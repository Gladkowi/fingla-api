"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("reflect-metadata");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: ['http://localhost:3000', 'http://192.168.1.33:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Fingla API')
        .setVersion('0.0.2')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map