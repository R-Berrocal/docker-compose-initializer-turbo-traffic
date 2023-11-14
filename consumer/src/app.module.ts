import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfiguration } from 'config/env.config';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: Joi.object({
        MONGO_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [EnvConfiguration().rabbitMqUrl],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot(EnvConfiguration().databaseUrl),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
