<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Consumer

**Paso 1: primero instalamos las dependencias necesarias con yarn add:**

- @nestjs/config
- @nestjs/microservices
- amqp-connection-manager
- class-transformer
- joi

**Paso 2: Configuracion del main.ts**

- Se llama al método listen en la instancia de la aplicación app para hacer que la aplicación escuche en el puerto 3001.
- Se crea un microservicio utilizando NestFactory.createMicroservice y se asigna a la variable microservices. Se pasa el módulo AppModule como argumento y se establecen las siguientes opciones de configuración:

```
- transport: Transport.RMQ - Indica que el transporte utilizado será RabbitMQ.
- options - Opciones de configuración específicas para RabbitMQ. Se establecen las siguientes opciones:

* urls: [EnvConfiguration().rabbitMqUrl] - URL(s) de RabbitMQ obtenidas de la configuración de variables de entorno.

* queue: 'users_queue' - Nombre de la cola de RabbitMQ a la que se conectará el microservicio.

* queueOptions - Opciones adicionales para la cola de RabbitMQ. En este caso, se establece durable: false para que la cola no sea durable.

* Se llama al método listen en el microservicio microservices para iniciar el microservicio y ponerlo a la escucha de mensajes entrantes.
```

**Paso 3: Configuracion del app.module.ts**

- Se importa el módulo ConfigModule de @nestjs/config para manejar la configuración de variables de entorno.
- Se importan los módulos ClientsModule, Transport de @nestjs/microservices para la comunicación con microservicios y MongooseModule de @nestjs/mongoose para la integración con MongoDB.
- Se importa el módulo Joi para la validación de la configuración de variables de entorno.
- Se importan el controlador AppController y el servicio AppService necesarios para el módulo.
- Se importa la clase EnvConfiguration del archivo env.config para obtener la configuración de variables de entorno específica.
- Se importa la clase User y el esquema UserSchema del archivo schemas/user.schema para la integración con MongoDB.
- ConfigModule.forRoot() se utiliza para cargar y configurar las variables de entorno. Se establece isGlobal: true para que la configuración sea global en toda la aplicación. Se carga la configuración de variables de entorno de la clase EnvConfiguration. También se define un esquema de validación para las variables de entorno utilizando Joi.
- ClientsModule.register() se utiliza para registrar un cliente de microservicio llamado 'USERS_SERVICE'. Se establece el transporte como RabbitMQ y se proporcionan las opciones de configuración, incluyendo las URLs de RabbitMQ obtenidas de la configuración de variables de entorno.
- MongooseModule.forRoot() se utiliza para configurar la conexión con MongoDB utilizando la URL de la base de datos obtenida de la configuración de variables de entorno.
- MongooseModule.forFeature() se utiliza para registrar el esquema UserSchema bajo el nombre User para su uso en la aplicación.
- Se definen los controladores y servicios que serán utilizados en este módulo.

**Paso 4: Creacion de los endpoints en el app.controller.ts**

- Se define el constructor de la clase AppController y se inyecta la dependencia AppService a través del parámetro private readonly appService.
- Se define el método crateUser decorado con @MessagePattern({ cmd: 'create_user' }). Este método recibe un parámetro createUserDto del tipo CreateUserDto y utiliza el método createUser del servicio appService para crear un usuario. El resultado de este método se devuelve como respuesta.

- Se define el método findAll decorado con @Get('/users'). Este método no recibe ningún parámetro y utiliza el método findAll del servicio appService para buscar todos los usuarios. El resultado de este método se devuelve como respuesta.

**Paso 5: Creacion de los services en el app.services.ts**

- Se define el constructor de la clase AppService y se inyecta el modelo User a través del decorador @InjectModel(User.name). El modelo inyectado se asigna a la propiedad userModel.
- Se define el método createUser como una función asincrónica. Este método recibe un parámetro createUserDto del tipo CreateUserDto. Se crea una nueva instancia del modelo User utilizando createUserDto. Luego, se llama al método save en la instancia de User para guardar el nuevo usuario en la base de datos. El resultado se devuelve como respuesta.
- Se define el método findAll como una función asincrónica. Este método no recibe ningún parámetro.
- Se utiliza el método find en el modelo User para buscar todos los usuarios en la base de datos. El resultado se devuelve como respuesta.
