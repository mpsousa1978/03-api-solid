import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { register } from "./register";
import { Authenticate } from "./authenticate";
import { profile } from "./profile";
import { Refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', Authenticate)
  app.patch('/token/refresh', Refresh)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
