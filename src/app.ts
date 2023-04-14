import fastify from "fastify"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"
import { usersRoutes } from "./http/controllers/users/routes"
import { gymsRoutes } from "./http/controllers/gyms/routes"

export const app = fastify()

app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _request, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({ message: "Validation error", issues: error.format() })
  }
  if (env.NODE_ENV != 'production') {
    console.error(error)
  } else {
    //todo: here we should log to an external tool like Datadog/Sentry
  }
  return replay.status(500).send({ message: "internal sever error" })
})

