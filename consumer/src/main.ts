import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { EnvConfiguration } from 'config/env.config';

async function bootstrap() {
  const microservices = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [EnvConfiguration().rabbitMqUrl],
      queue: 'users_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await microservices.listen();

  const app = await NestFactory.create(AppModule);
  await app.listen(EnvConfiguration().port, async () =>
    console.log(`🚀 Server ready at: ${await app.getUrl()}`),
  );
}
bootstrap();
