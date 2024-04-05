import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);

    app.setGlobalPrefix(config.get<string>('API_PREFIX') ?? 'api');
    app.enableCors();

    app.useGlobalPipes(new ZodValidationPipe());
    await app.listen(Number(config.get<string>('APP_PORT')));
}
bootstrap();
