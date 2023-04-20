import { z } from "zod"

import { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchUserCheckInsHistoryUseCase } from "@/useCase/factories/make-fetch-user-check-ins-history-use-case"

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = checkInHistoryGymsQuerySchema.parse(request.query)

  const FetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const checkIns = await FetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page
  })

  return reply.status(200).send(checkIns)
}

