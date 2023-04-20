import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetUserMetricsUseCase } from "@/useCase/factories/make-get-user-metrics-use-case"

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getMetricsUseCase = makeGetUserMetricsUseCase()

  const checkInsCount = await getMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(checkInsCount)
}

