import { z } from "zod"

import { FastifyRequest, FastifyReply } from "fastify"
import { makeCheckInUseCase } from "@/useCase/factories/make-check-in-use-case"

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid()
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine(value => { return Math.abs(value) <= 90 }),
    longitude: z.number().refine(value => { return Math.abs(value) <= 100 })
  })

  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const CheckInUseCase = makeCheckInUseCase()

  await CheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  })

  return reply.status(201).send()
}

