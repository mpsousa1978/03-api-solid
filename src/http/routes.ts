import { FastifyInstance } from "fastify";
import { register } from "./Controllers/register";
import { Authenticate } from "./Controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {

  app.post('/users', register)
  app.post('/sessions', Authenticate)

}
