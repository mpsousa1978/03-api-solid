import { z } from "zod"

import { FastifyRequest, FastifyReply } from "fastify"
import { InvalidCredentialsError } from "@/useCase/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "@/useCase/factories/make-authenticate"


export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}