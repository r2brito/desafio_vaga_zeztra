## Teste FullStack - Backend

Vamos fazer o uso do docker para executar o banco de dados usado na aplicação.

1. Instalar Docker
   Certifique-se de ter o Docker instalado na sua máquina. Você pode baixá-lo do site oficial do [`Docker`](https://www.docker.com/).

2. Criar Container
   Execute o seguinte comando para iniciar um contêiner MongoDB:

```bash
docker run -d \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -p 27017:27017 \
  mongo
```

3. Configure o arquivo .env:

```
cp .env.example .env
```

4. Instalar dependencias:

```
npm install
```

or

```
yarn install
```

5. Start the application:

```
npm run start:dev
```

or

```
yarn start:dev
```
