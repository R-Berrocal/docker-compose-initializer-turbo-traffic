export const EnvConfiguration = () => ({
  rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
  databaseUrl: process.env.MONGO_URL ?? '',
  port: process.env.PORT ?? '',
});
