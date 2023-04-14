import 'dotenv/config'
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import { execSync } from 'node:child_process';
import { Prisma, PrismaClient } from '@prisma/client';
import { errorUtil } from 'zod/lib/helpers/errorUtil';

const prisma = new PrismaClient();

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Sem DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)
  //console.log(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const dataBaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = dataBaseURL
    //console.log('Criar banco')
    execSync('npx prisma migrate deploy') //com o deploy o prisma não analisa se as tabelas ja existem

    return {
      async teardown() {
        //Delete database
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE `)
        await prisma.$disconnect()
      }
    }
  }
};
