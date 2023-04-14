import 'dotenv/config'
import { randomUUID } from "node:crypto";
import { Environment, EnvironmentReturn } from "vitest";

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Sem DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    //console.log(generateDataBaseURL(schema))
    console.log('executed')
    return {
      async teardown() {
        console.log('Teardown')
      }
    };
  }
};












