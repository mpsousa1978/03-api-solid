import { FastifyInstance } from "fastify";
import { register } from "./register";
import { Authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', Authenticate)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
