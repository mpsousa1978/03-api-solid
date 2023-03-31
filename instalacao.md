npm init -y
npm i typescript @types/node tsup tsx -D
npm i tsup -D
npm i tsx -D
npx tsc --init

no tsconfig, converter para target "2020"

npm i fastify

arquivo .npmrc -- fixa a versão da instalação das Dependencias

npm i dotenv -- para acessar as variaveis de ambiente process.env.(nome variavel)

npm i zod -- validaçoes

npm i eslint @rocketseat/eslint-config -D

arquivo .eslintrc.json
{
  "extends": [
    "@rocketseat/eslint-config/node"
  ],
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    }
  ]
}


----- type 
npm i prisma -D

npx prisma init --inicia a parte de banco de dados
instalar a extenção do prisma
no settins.json
  "[prisma]": {
    "editor.formatOnSave": true
  },


------------------------
apos criar o model
npx prisma generate --- gera uma especia de DTO dos models(tabelas)
npx prisma migrate dev
npm i @prisma/client -- usado para acessar o banco de dados


-------------------------------------------
Instalando o docker, depois de rodar o arquivo do download
para criar o banco e docker
docker run --name "nome no docker" -e POSTGRESQL_USERNAEM=docker -e POSTGRESQL_PASSWORLD=docker -e POSTGRESQL_DATABASE=apisolid  -p 5432:5432 "imagem"

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid  -p 5432:5432 bitnami/postgresql

para startar
docker start api-solid-pg
docker stop api-solid-pg

npx prisma studio --abre uma interface para usar o banco de dados Prisma Studio is up on http://localhost:5555


arquivo docker-compose.yml
version: '3'

services:
  api-solid-pg:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid

docker compose up -d #roda o arquivo docker-compose.yml
docker compose stop -d



----------------------------------------

npm i bcryptjs
npm i -D @types/bcryptjs