<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Inicializacion de los microservicios

**Paso 1: correr el docker compose con el siguiente comando:**

```
docker compose up --build
```

**Paso2: Usando un cliente como postman consumir los siguientes endpoints**

```

METHODO GET: http://localhost:3001/users

METHODO POST: http://localhost:3000/users

body:{
        "user":"alejandro"
    }

```
