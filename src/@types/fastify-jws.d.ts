import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    //payLoad: { id: number }
    user: {
      sub: string
    }
  }
}