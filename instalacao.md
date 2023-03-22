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