import { prismaBD } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function CreateAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  const user = await prismaBD.user.create({
    data: {
      name: 'John One',
      email: 'johnone@example.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER'
    }
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johnone@example.com',
    password: '123456'
  })

  const { token } = authResponse.body

  return { token }

}