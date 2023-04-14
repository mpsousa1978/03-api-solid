import { FastifyInstance } from "fastify";
import { register } from "./Controllers/register";
import { Authenticate } from "./Controllers/authenticate";
import { profile } from "./Controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)
  app.post('/sessions', Authenticate)


  app.get('/me', { onRequest: [verifyJWT] }, profile)

}
