import { env } from "@/env"
import { PrismaClient } from "@prisma/client"


export const prismaBD = new PrismaClient({

  log: env.NODE_ENV === 'dev' ? ['query'] : [] //exibe log dev

})
